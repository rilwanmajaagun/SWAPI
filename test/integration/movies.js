import { expect } from 'chai';
import nock from 'nock';
import request from 'supertest';
import { constants } from '../../src/utils';
import app from '../../src/index';
import {moviesList} from './mockMovies'

const {RESOURCE_FETCH_SUCCESS, RESOURCE_CREATE_SUCCESS} = constants


describe('MOVIES', () => {
    it('should return list of movies', (done) => {
      nock('https://swapi.dev/api')
        .get('/films/')
        .reply(200, moviesList);
      request(app)
        .get('/api/v1/movies')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal(RESOURCE_FETCH_SUCCESS('Movies'));
          expect(res.body.code).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          done();
        });
    });

    it('should return error if episode is a string', (done) => {
      request(app)
        .post('/api/v1/movies/a/comment')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          body: "Awesome movie"
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('episodeId must be a number');
          expect(res.body.code).to.equal(400);
          expect(res.body).to.haveOwnProperty('errors');
          done();
        });
    });
    it('should return error if payload is empty', (done) => {
      request(app)
        .post('/api/v1/movies/1/comment')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({

        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('comment is required');
          expect(res.body.code).to.equal(400);
          expect(res.body).to.haveOwnProperty('errors');
          done();
        });
    });

    it('should add comment to movie', (done) => {
      request(app)
        .post('/api/v1/movies/1/comment')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          comment: "Awesome movie"
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal(RESOURCE_CREATE_SUCCESS('Comment'));
          expect(res.body.code).to.equal(201);
          expect(res.body).to.haveOwnProperty('data');
          done();
        });
    });

    it('should return list of movies after comment is added ', (done) => {
      nock('https://swapi.dev/api')
        .get('/films/')
        .reply(200, moviesList);
      request(app)
        .get('/api/v1/movies')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal(RESOURCE_FETCH_SUCCESS('Movies'));
          expect(res.body.code).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          done();
        });
    });

    it('should return a movie comment', (done) => {
      request(app)
        .get('/api/v1/movies/1/comment')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal(RESOURCE_FETCH_SUCCESS('Comment'));
          expect(res.body.code).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          done();
        });
    });
  })
