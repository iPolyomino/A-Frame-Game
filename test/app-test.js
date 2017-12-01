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
            console.error('Failed : Document has wrong title.', error);
            done(error);
        });
    });

    it('Should has a camera', done => {
        const nightmare = new Nightmare();
        nightmare.goto(url).evaluate(() => {
            return document.getElementsByTagName('a-camera').length;
        }).end().then(result => {
            assert.strictEqual(result, 1);
            done();
        }).catch(error => {
            console.error('Failed : Document doesn\'t have camera .', error);
            done(error);
        });
    });

    it('Should has a cursor', done => {
        const nightmare = new Nightmare();
        nightmare.goto(url).evaluate(() => {
            return document.getElementsByTagName('a-cursor').length;
        }).end().then(result => {
            assert.strictEqual(result, 1);
            done();
        }).catch(error => {
            console.error('Failed : Document doesn\'t have cursor .', error);
            done(error);
        });
    });
});

describe('Class Test', () => {
    const url = 'http://localhost:3000/';

    it('Should has cubes', done => {
        const nightmare = new Nightmare();
        nightmare.goto(url).evaluate(() => {
            return document.getElementsByTagName('a-box').length;
        }).end().then(result => {
            assert.notEqual(result, null);
            done();
        }).catch(error => {
            console.error('Failed : Document doesn\'t have box .', error);
            done(error);
        });
    });

    it('Should remove cubes when clicked', done => {
        const nightmare = new Nightmare();
        nightmare.goto(url).evaluate(() => {
            const event = document.createEvent('MouseEvents');
            event.initEvent('click', false, true);
            let boxes = document.getElementsByTagName('a-box');
            for (let i = boxes.length - 1; i >= 0; i--) {
                boxes[i].dispatchEvent(event);
            }
            return document.getElementsByTagName('a-box').length;
        }).end().then(result => {
            assert.strictEqual(result, 0);
            done();
        }).catch(error => {
            console.error('Failed', error);
            done(error);
        });
    });
});
