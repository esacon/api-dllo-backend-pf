const supertest = require('supertest');
const mongoose = require('mongoose');
const path = require('path');
const { app, server} = require('../server');

require('dotenv').config({ path: path.resolve(__dirname, '../database/.env') });

const api = supertest(app);
const TEST_TOKEN = process.env.TEST_TOKEN; 
const USER_ID = "629804e0a09e3be16918b548";

describe('follows/followers route', () => {
    test('Dennied access without token', async () => { 
        const response = await api.get(`/follows/followers?user_id=${USER_ID}`);
        expect(response.statusCode).toBe(401);        
        expect(response.body.error).toBe('No token provided in header.');
    });
    
    test('Dennied access for invalid token', async () => { 
        const response = await api.get(`/follows/followers?user_id=${USER_ID}`).set('token', USER_ID);
        expect(response.statusCode).toBe(403);        
        expect(response.body.error).toBe('Token is invalid or has expired.');
    });

    test('User not found for empty user_id', async () => { 
        const response = await api.get(`/follows/followers`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(404);        
        expect(response.body.error).toBe('User not found.');
    });

    test('User not found for invalid user_id', async () => { 
        const response = await api.get('/follows/followers?user_id=FFFFFFFFFFF').set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(404);        
        expect(response.body.error).toBe('User not found.');
    });

    test('Allow access for valid token', async () => { 
        const response = await api.get(`/follows/followers?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(200);        
    });
    
    test('Users returned as array', async () => {  
        const response = await api.get(`/follows/followers?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(200);   
        expect(response.body).toBeInstanceOf(Array)
    });
});

afterAll(async () => {
    server.close();
    await mongoose.connection.close();
});