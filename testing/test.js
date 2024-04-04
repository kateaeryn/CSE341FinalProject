'use strict';
const mongoose = require('mongoose');
const dataBase = require('../models/index');
const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const app = new express();
app.use('/', router);

describe('Testing', () => {
    beforeAll((done) => {
        mongoose.connect(dataBase.URL);
        let db = mongoose.connection;
        db.on('error', (err) => {
            done.fail(err);
        });
        db.once('open', () => {
            done();
        })
    })
    it("has some property", () => {
        expect(1).toBe(1);
    })
    

// describe('login/out routes test', () => {
      
//     });
describe('inventory route tests', () => {
    test('responds to /inventory', async () => {
        const res = await request(app).get('/inventory');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    })
    test('responds to /inventory/:id', async () => {
        const res = await request(app).get('/inventory/6605b308922386e05db88a93');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    })
    
});

describe('order route tests', () => {
    test('responds to /orders', async () => {
        const res = await request(app).get('/orders');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    })
    test('responds to /orders/:id', async () => {
        const res = await request(app).get('/orders/6605b30f922386e05db88a9a');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    })
});

    describe('account route tests', () => {
        test('responds to /account/:id', async () => {
            const res = await request(app).get('/account/6605b31c922386e05db88aa3');
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
        })
    });

    describe('review route tests', () => {
        test('responds to /reviews/:id', async () => {
            const res = await request(app).get('/reviews/6605b316922386e05db88a9f');
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
        })
    });

afterAll(done => {
    mongoose.connection.close();
    done();
});
});