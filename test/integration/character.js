import { expect } from 'chai';
import nock from 'nock';
import request from 'supertest';
import app from '../../src/index';
import {characters} from './mockCharacter'
import {constants} from '../../src/utils'

const {RESOURCE_FETCH_SUCCESS} = constants

describe('CHARACTER', () => {
    it('should return list of character', (done) => {
      nock('https://swapi.dev/api')
        .get('/people/')
        .reply(200, characters);
      request(app)
        .get('/api/v1/character')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal(RESOURCE_FETCH_SUCCESS('Character'));
          expect(res.body.code).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          done();
        });
    });
    it('should return list of character by name ascending order', (done) => {
      nock('https://swapi.dev/api')
        .get('/people/')
        .reply(200, characters);
      request(app)
        .get('/api/v1/character?sort=name')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal(RESOURCE_FETCH_SUCCESS('Character'));
          expect(res.body.code).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          done();
        });
    });

    it('should return list of  character sorted by height descending order', (done) => {
      nock('https://swapi.dev/api')
        .get('/people/')
        .reply(200, characters);
      request(app)
        .get('/api/v1/character?sort=height&order=desc')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal(RESOURCE_FETCH_SUCCESS('Character'));
          expect(res.body.code).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          done();
        });
    });
    it('should return list of character filter by gender', (done) => {
      nock('https://swapi.dev/api')
        .get('/people/')
        .reply(200, characters);
      request(app)
        .get('/api/v1/character?gender=male')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal(RESOURCE_FETCH_SUCCESS('Character'));
          expect(res.body.code).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          done();
        });
    });
  })
