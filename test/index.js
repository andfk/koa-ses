'use strict';

/*global describe, it, after  */

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

    describe('SNS notifications with SES message', ()=>{

      it('Trigger a fake SES email notification from SNS', function * (){

        let app = koa();
        let sesStub = sinon.stub().returns( Promise.resolve() );

        app.use(koaSES(sesStub));

        yield request(http.createServer(app.callback()))
        .post('/ses/notification')
        .set('x-amz-sns-message-type', 'Notification')
        // SNS has Content-Type text/plain
        // .set('Content-Type', 'text/plain; charset=UTF-8')
        .send(fakeData.notification)
        .expect(200, 'Ok');

        assert.ok(sesStub.calledOnce);
        assert.deepEqual(sesStub.getCall(0).args[0].rawMessage, JSON.parse(fakeData.notification.Message));

      });

    });

    describe('SNS suscription confirmation', ()=>{

      let requestSpy;
      it('Should receive and confirm a suscription to topic', ()=>{

        requestSpy = sinon.stub(requestPromise, 'get').returns({msg:'ok'});

        let app = koa();
        let sesSpy = sinon.spy();

        app.use(koaSES(sesSpy));

        return request(http.createServer(app.callback()))
        .post('/ses/notification')
        .set('x-amz-sns-message-type', 'SubscriptionConfirmation')
        // SNS has Content-Type text/plain
        // .set('Content-Type', 'text/plain; charset=UTF-8')
        .send(fakeData.suscription)
        .expect(200, 'Suscription confirmed');

      });

      after(()=>{
        requestSpy.restore();
      });

    });

});
