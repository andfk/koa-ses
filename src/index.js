'use strict';
import request from 'request-promise';
import crypto from 'crypto';

// Implementation of the validator and builder of signature based on node-snsclient package. (https://github.com/mattrobenolt/node-snsclient)
function buildSignatureString(message) {
  let chunks = [];
  if(message.Type === 'Notification') {
      chunks.push('Message');
      chunks.push(message.Message);
      chunks.push('MessageId');
      chunks.push(message.MessageId);
      if(message.Subject) {
          chunks.push('Subject');
          chunks.push(message.Subject);
      }
      chunks.push('Timestamp');
      chunks.push(message.Timestamp);
      chunks.push('TopicArn');
      chunks.push(message.TopicArn);
      chunks.push('Type');
      chunks.push(message.Type);
  } else if(message.Type === 'SubscriptionConfirmation') {
      chunks.push('Message');
      chunks.push(message.Message);
      chunks.push('MessageId');
      chunks.push(message.MessageId);
      chunks.push('SubscribeURL');
      chunks.push(message.SubscribeURL);
      chunks.push('Timestamp');
      chunks.push(message.Timestamp);
      chunks.push('Token');
      chunks.push(message.Token);
      chunks.push('TopicArn');
      chunks.push(message.TopicArn);
      chunks.push('Type');
      chunks.push(message.Type);
  } else { return false; }

  return chunks.join('\n')+'\n';
}

function validateSignature(pem, message) {
    let msg = buildSignatureString(message);
    if(!msg) throw new Error('Invalid signature');

    let verifier = crypto.createVerify('RSA-SHA1');
    verifier.update(msg, 'utf8');
    return verifier.verify(pem, message.Signature, 'base64');
}

/**
 * Koa-ses middleware to listen to get notifications and confirm subscription
 * by SNS from SES (services of AWS).
 * @param  {Function} callback [Called when a message notification occurs]
 * @param  {Object}   options
 * @return Void
 */
function koaSES(callback, options){

  let defaultOptions = {
    path: '/ses/notification',
    validate: true
  };

  // Caches the certificates downloaded to validate signatures
  let pemCache = [];

  options = Object.assign(defaultOptions, options);

  // Check if is set the callback
  if(!callback || !(callback instanceof Function)) {
    throw new Error('Missing a callback function to handle notifications received of SES from SNS.');
  }

  return function *(next) {

    // Check path based on options to handle SNS notifications
    if(this.path === options.path && this.method === 'POST') {

      try {

        // Get the body data and parse json from the http/s notification
        let getSNSBody = ()=> {
          return new Promise((resolve, reject)=>{
            try {
              let bodyData = [];
              this.req.on('data', (chunk)=>{ bodyData.push(chunk); });
              this.req.on('end', ()=>{
                bodyData = bodyData.join('');
                if(!bodyData) throw new Error('No body content in notification');
                return resolve(JSON.parse(bodyData));
              });
            } catch (e) {
              if(e) reject(e);
            }
          });
        };

        // Get the header of message type from SNS
        let requestMessageType = this.request.get('x-amz-sns-message-type');
        if(!requestMessageType) throw new Error('Header x-amz-sns-message-type is not set');

        // Get body data
        let snsBody = yield getSNSBody();

        // Validation happens by default. Skipped for testing/debugging if needed.
        if(options.validate) {
          // Validate signature version 1 only
          if(snsBody.SignatureVersion !== "1") throw new Error(`No possible to validate handle signatures of version ${snsBody.SignatureVersion}. Only handles version 1.`);
          // Get certificate from cache or download it
          let pem;
          if(!pemCache[snsBody.SigningCertURL]) {
              pem = yield request.get(snsBody.SigningCertURL);
              pemCache[snsBody.SigningCertURL] = pem;
          } else {
            pem = pemCache[snsBody.SigningCertURL];
          }
          // Finish request if validation fails
          if(!validateSignature(pem, snsBody)) return this.res.end();
        }

        switch (requestMessageType) {
          case 'SubscriptionConfirmation':
            // The confirmSubscription is called when a SNS suscription channel
            // is added to a topic so the "subscriber" must confirm the
            // subscription calling the Subscription url
            try {
              yield request.get(snsBody.SubscribeURL);
              this.body = 'Suscription confirmed';
            }
            catch (e) {
              throw new Error(`SNS Subscription confirmation for Topic ARN [${snsBody.TopicArn}] failed`);
            }
            break;
          case 'Notification':
              // Get the message data of the notification to update email
              let snsMessage = JSON.parse(snsBody.Message);
              // Execute custom logic of callback and pass parameters
              yield callback.call(this, {
                messageId: snsMessage.mail.messageId,
                serviceStatus:snsMessage.notificationType,
                from:snsMessage.mail.source,
                status: (snsMessage.notificationType === 'Delivery') ? 'Sent' : 'Failed',
                destination: snsMessage.mail.destination,
                timestamp: snsMessage.mail.timestamp,
                rawMessage: snsMessage
              });
              this.body = 'Ok';
            break;
          default:
            this.status = 400;
            this.body = 'Unknow Message type';
        }

      } catch (e) {
        if(e) throw e;
      }

    } else {
      yield next;
    }
  };

}

module.exports = koaSES;
