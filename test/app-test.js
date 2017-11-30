'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const Nightmare = require('nightmare');
const app = require('../app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Express Server Test', () => {
    it('Should return status code 200', done => {
        chai.request(app).get('/').end( (err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('Application Test', () => {
    const url = 'http://localhost:3000/';

    it('Should have object named "box"', done => {
        const nightmare = new Nightmare();
        nightmare.goto(url).exists('#box').then( exists => {
            expect(exists).to.be.true;
            done();
        }).catch( error => {
            done(error);
        });
    }).timeout(10000);
});
