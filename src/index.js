'use strict';
import request from 'request-promise';

/**
 * Koa-ses middleware to listen to get notifications and confirm subscription
 * by SNS from SES (services of AWS).
 * @param  {Function} callback [Called when a message notification occurs]
 * @param  {Object}   options
 * @return Void
 */
function koaSES(callback, options){

  let defaultOptions = {
    path: '/ses/notification'
  };

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

        let snsBody = yield getSNSBody();
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
              let funcRes = yield callback.call(this, {
                messageId: snsMessage.mail.messageId,
                serviceStatus:snsMessage.notificationType,
                from:snsMessage.mail.source,
                status: (snsMessage.notificationType === 'Delivery') ? 'Sent' : 'Failed',
                destination: snsMessage.mail.destination,
                timestamp: snsMessage.mail.timestamp,
                rawMessage: snsMessage
              });
              // Skip response if function returned value is false
              if(funcRes || typeof funcRes === 'undefined') {
                this.body = 'Ok';
              }
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
