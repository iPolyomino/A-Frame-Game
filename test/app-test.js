'use strict';

const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Nightmare = require('nightmare');
const app = require('../app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Express Server Test', () => {
    it('Should return status code 200', done => {
        chai.request(app).get('/').end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('Application Test', () => {
    const url = 'http://localhost:3000/';

    it('Should has title', done => {
        const nightmare = new Nightmare();
        nightmare.goto(url).evaluate(() => {
            return document.title;
        }).end().then(result => {
            assert.strictEqual(result, 'A-Frame-Game');
            done();
        }).catch(error => {
            console.error('failed', error);
            done(error);
        });
    });
});
