const supertest = require('supertest');
const mongoose = require('mongoose');
const path = require('path');
const { app, server} = require('../server');

/**
 * Lista de seguidores de un usuario
 * Lista de seguidos de un usuario
 * Solicitar seguir
 * Aceptar solicitud
 * Aceptar solicitud previamente aceptada o rechazada
 * Rechazar solicitud
 * Rechazar solicitud previamente aceptada o rechazada
 */

require('dotenv').config({ path: path.resolve(__dirname, '../database/.env') });

const api = supertest(app);
const TEST_TOKEN = process.env.TEST_TOKEN; 
const USER_ID = "629804e0a09e3be16918b548";
const USER2_ID = "62995b2b98a694ecb156281f";
/**
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

describe('follows/following route', () => {
    test('Dennied access without token', async () => { 
        const response = await api.get(`/follows/following?user_id=${USER_ID}`);
        expect(response.statusCode).toBe(401);        
        expect(response.body.error).toBe('No token provided in header.');
    });
    
    test('Dennied access for invalid token', async () => { 
        const response = await api.get(`/follows/following?user_id=${USER_ID}`).set('token', USER_ID);
        expect(response.statusCode).toBe(403);        
        expect(response.body.error).toBe('Token is invalid or has expired.');
    });

    test('User not found for empty user_id', async () => { 
        const response = await api.get(`/follows/following`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(404);        
        expect(response.body.error).toBe('User not found.');
    });

    test('User not found for invalid user_id', async () => { 
        const response = await api.get('/follows/following?user_id=FFFFFFFFFFF').set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(404);        
        expect(response.body.error).toBe('User not found.');
    });

    test('Allow access for valid token', async () => { 
        const response = await api.get(`/follows/following?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(200);        
    });
    
    test('Users returned as array', async () => {  
        const response = await api.get(`/follows/following?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(200);   
        expect(response.body).toBeInstanceOf(Array)
    });
});
 */
describe('follows/request route', () => {
    test('Dennied access without token', async () => { 
        const response = await api.post(`/follows/request`).type('form').send({user_id: USER2_ID});
        expect(response.statusCode).toBe(401);        
        expect(response.body.error).toBe('No token provided in header.');
    });
    
    test('Dennied access for invalid token', async () => { 
        const response = await api.post(`/follows/request`).type('form').send({user_id: USER2_ID}).set('token', USER_ID);
        expect(response.statusCode).toBe(403);        
        expect(response.body.error).toBe('Token is invalid or has expired.');
    });

    test('User not found for empty user_id', async () => { 
        const response = await api.post(`/follows/request`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(404);        
        expect(response.body.error).toBe('Not user to follow.');
    });

    test('User not found for invalid user_id', async () => { 
        const response = await api.post('/follows/request').type('form').send({user_id: "FFFFFFFFFFF"}).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(500);        
        expect(response.body.error).toBe('Invalid user_id.');
    });

    test('Not to follow itself', async () => { 
        const response = await api.post(`/follows/request`).type('form').send({user_id: USER_ID}).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(500);        
        expect(response.body.error).toBe('An user cannot follow itself.');
    });
    
    test('Allow access for valid token', async () => {  
        const response = await api.post(`/follows/request`).type('form').send({user_id: USER2_ID}).set('token', TEST_TOKEN);
        console.log(response.body)
        expect(response.statusCode).toBe(200);   
        expect(response.body).toStrictEqual({});
    });
});

afterAll(async () => {
    server.close();
    await mongoose.connection.close();
});