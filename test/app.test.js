import { expect } from 'chai';
import request from 'supertest';
import { constants } from '../src/utils';
import app from '../src/index';

const { WELCOME, NOT_FOUND_API } = constants;

describe('Integration test', () => {
  it('Hello World', (done) => {
    request(app)
      .get('/')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal(WELCOME);
        done();
      });
  });
  it('Not Found Route', (done) => {
    request(app)
      .get('/api/v2/')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal(NOT_FOUND_API);
        done();
      });
  });
});
