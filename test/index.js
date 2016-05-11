'use strict';

/*global describe, it, after, before  */

import koaSES from '../src';
import sinon from 'sinon';
import request from 'supertest';
import requestPromise from 'request-promise';
import http from 'http';
import koa from 'koa';
import assert from 'assert';
import fakeData from './fakedata';

describe('koa-ses', ()=>{

    describe('Initialization', ()=>{

      it('Throw exception if not callback is specified', ()=>{
          assert.throws(koaSES, Error);
      });

      it('Return a function when called', ()=>{
          let koaSes = koaSES(function(){});
          assert.equal(typeof koaSes, 'function');
      });

    });

    describe('SNS notifications', function(){


      before(()=>{
        this.requestStub = sinon.stub(requestPromise, 'get');
        this.requestStub.withArgs(fakeData.suscription.SubscribeURL).returns({msg:'ok'});

      });

      describe('Suscription confirmation', ()=>{

        it('Should receive and confirm a suscription to topic', ()=>{

          let app = koa();
          let sesSpy = sinon.spy();

          app.use(koaSES(sesSpy, {validate:false}));

          return request(http.createServer(app.callback()))
          .post('/ses/notification')
          .set('x-amz-sns-message-type', fakeData.suscription.Type)
          // SNS has Content-Type text/plain
          // .set('Content-Type', 'text/plain; charset=UTF-8')
          .send(fakeData.suscription)
          .expect(200, 'Suscription confirmed');

        });

      });

      describe('Notification from SES', ()=>{

        it('Trigger a fake SES email notification from SNS', function * (){
          let app = koa();
          let sesStub = sinon.stub().returns( Promise.resolve() );

          app.use(koaSES(sesStub, {validate:false}));

          yield request(http.createServer(app.callback()))
          .post('/ses/notification')
          .set('x-amz-sns-message-type', fakeData.notification.Type)
          // SNS has Content-Type text/plain
          // .set('Content-Type', 'text/plain; charset=UTF-8')
          .send(fakeData.notification)
          .expect(200, 'Ok');

          assert.ok(sesStub.calledOnce);
          assert.deepEqual(sesStub.getCall(0).args[0].rawMessage, JSON.parse(fakeData.notification.Message));

        });

      });

      after(()=>{
        this.requestStub.restore();
      });


    });

});
