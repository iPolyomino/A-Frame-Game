'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Express Server', () => {
    it('Should return status code 200', (done) => {
        chai.request(app).get('/').end( (err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });
});
