import { error } from 'util';

import serverSvc from './server';
import connect from '../src';
let server = serverSvc.init();
const assert = require('assert');
const resourceAgent = connect('desktop', server);
const resource = resourceAgent.resource;
class ModelClass{
    constructor(){}
}

describe('cs-connect', function(done) {
    describe('base test', function() {
        it('Init connect should be ok!', function(done) {
            resource.test().get().then(data => {
                assert.equal('success', data);
                done();
                // assert.ok(true);
            }).catch(error => {
                done(error);
            })
        });
        it('#addRequestInterceptors', function(done) {
            assert.equal(resourceAgent._requestInterceptors.length, 0);
            resourceAgent.addRequestInterceptors(Request => Request);
            assert.equal(resourceAgent._requestInterceptors.length, 1);
            resource.test().get().then(data => {
                assert.equal('success', data);
                done();
                // assert.ok(true);
            }).catch(error => {
                done(error);
            })
        });
        it('#addResponseInterceptors', function(done) {
            assert.equal(resourceAgent._responseInterceptors.length, 0);
            resourceAgent.addResponseInterceptors(response => response);
            assert.equal(resourceAgent._responseInterceptors.length, 1);
            resource.test().get().then(data => {
                assert.equal('success', data);
                done();
                // assert.ok(true);
            }).catch(error => {
                done(error);
            })
        })
    });
    describe('other test',function(){
        it('payload $meta should be success', function (done) {
            resource.test().post({$meta:'test'}).then(data => {
                console.log(123,data);
                assert.equal('test', data.$meta);
                done();
                // assert.ok(true);
            }).catch(error => {
                done(error);
            })
        })
    })
})