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
const TEST_TOKEN2 = process.env.TEST_TOKEN2; 
const USER_ID = "629804e0a09e3be16918b548";
const USER2_ID = "62995b2b98a694ecb156281f";
const REQUEST_ID = "62996a1e9326cf28025ef620";

 describe('follows/followers route', () => {
    test.skip('Dennied access without token', async () => { 
        const response = await api.get(`/follows/followers?user_id=${USER_ID}`);
        expect(response.statusCode).toBe(401);        
        expect(response.body.error).toBe('No token provided in header.');
    });
    
    test.skip('Dennied access for invalid token', async () => { 
        const response = await api.get(`/follows/followers?user_id=${USER_ID}`).set('token', USER_ID);
        expect(response.statusCode).toBe(403);        
        expect(response.body.error).toBe('Token is invalid or has expired.');
    });

    test.skip('User not found for empty user_id', async () => { 
        const response = await api.get(`/follows/followers`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(404);        
        expect(response.body.error).toBe('User not found.');
    });

    test.skip('User not found for invalid user_id', async () => { 
        const response = await api.get('/follows/followers?user_id=FFFFFFFFFFF').set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(404);        
        expect(response.body.error).toBe('User not found.');
    });

    test.skip('Allow access for valid token', async () => { 
        const response = await api.get(`/follows/followers?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(200);        
    });
    
    test.skip('Lista de seguidores de un usuario', async () => {  
        const response = await api.get(`/follows/followers?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(200);   
        expect(response.body).toBeInstanceOf(Array)
    });
});

describe('follows/following route', () => {
    test.skip('Dennied access without token', async () => { 
        const response = await api.get(`/follows/following?user_id=${USER_ID}`);
        expect(response.statusCode).toBe(401);        
        expect(response.body.error).toBe('No token provided in header.');
    });
    
    test.skip('Dennied access for invalid token', async () => { 
        const response = await api.get(`/follows/following?user_id=${USER_ID}`).set('token', USER_ID);
        expect(response.statusCode).toBe(403);        
        expect(response.body.error).toBe('Token is invalid or has expired.');
    });

    test.skip('User not found for empty user_id', async () => { 
        const response = await api.get(`/follows/following`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(404);        
        expect(response.body.error).toBe('User not found.');
    });

    test.skip('User not found for invalid user_id', async () => { 
        const response = await api.get('/follows/following?user_id=FFFFFFFFFFF').set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(404);        
        expect(response.body.error).toBe('User not found.');
    });

    test.skip('Allow access for valid token', async () => { 
        const response = await api.get(`/follows/following?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(200);        
    });
    
    test.skip('Lista de seguidos de un usuario', async () => {  
        const response = await api.get(`/follows/following?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(200);   
        expect(response.body).toBeInstanceOf(Array)
    });
});

describe('follows/request route', () => {
    test.skip('Dennied access without token', async () => { 
        const response = await api.post(`/follows/request`).type('form').send({user_id: USER2_ID});
        expect(response.statusCode).toBe(401);        
        expect(response.body.error).toBe('No token provided in header.');
    });
    
    test.skip('Dennied access for invalid token', async () => { 
        const response = await api.post(`/follows/request`).type('form').send({user_id: USER2_ID}).set('token', USER_ID);
        expect(response.statusCode).toBe(403);        
        expect(response.body.error).toBe('Token is invalid or has expired.');
    });

    test.skip('User not found for empty user_id', async () => { 
        const response = await api.post(`/follows/request`).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(404);        
        expect(response.body.error).toBe('Not user to follow.');
    });

    test.skip('User not found for invalid user_id', async () => { 
        const response = await api.post('/follows/request').type('form').send({user_id: "FFFFFFFFFFF"}).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(500);        
        expect(response.body.error).toBe('Invalid user_id.');
    });

    test.skip('Not to follow itself', async () => { 
        const response = await api.post(`/follows/request`).type('form').send({user_id: USER_ID}).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(500);        
        expect(response.body.error).toBe('An user cannot follow itself.');
    });
    
    test.skip('Solicitar seguir', async () => {  
        const response = await api.post(`/follows/request`).type('form').send({user_id: USER2_ID}).set('token', TEST_TOKEN);
        console.log(response.body)
        expect(response.statusCode).toBe(200);   
        expect(response.body).toStrictEqual({});
    });
});

describe('follows/response route', () => {
    test.skip('Dennied access without token', async () => { 
        const response = await api.post(`/follows/response`).type('form').send({request_id: REQUEST_ID, action: "accept"});
        expect(response.statusCode).toBe(401);        
        expect(response.body.error).toBe('No token provided in header.');
    });
    
    test.skip('Dennied access for invalid token', async () => { 
        const response = await api.post(`/follows/response`).type('form').send({request_id: REQUEST_ID, action: "accept"}).set('token', USER_ID);
        expect(response.statusCode).toBe(403);        
        expect(response.body.error).toBe('Token is invalid or has expired.');
    });

    test.skip('Dennied access for other user\'s token', async () => { 
        const response = await api.post(`/follows/response`).type('form').send({request_id: REQUEST_ID, action: "accept"}).set('token', TEST_TOKEN);
        expect(response.statusCode).toBe(403);        
        expect(response.body.error).toBe('Access denied.');
    });

    test.skip('Missing request_id and/or action', async () => { 
        const response = await api.post(`/follows/response`).set('token', TEST_TOKEN2);
        expect(response.statusCode).toBe(400);        
        expect(response.body.error).toBe('Invalid request_id or action.');
    });

    test.skip('Invalid request_id', async () => { 
        const response = await api.post('/follows/response').type('form').send({request_id: "FFFFFFFFFFF", action: "accept"}).set('token', TEST_TOKEN2);
        expect(response.statusCode).toBe(400);        
        expect(response.body.error).toBe('Invalid request_id or action.');
    });
    
    test.skip('Aceptar solicitud', async () => {  
        const response = await api.post(`/follows/response`).type('form').send({request_id: REQUEST_ID, action: "accept"}).set('token', TEST_TOKEN2);
        console.log(response.body)
        expect(response.statusCode).toBe(200);   
        expect(response.body).toStrictEqual({});
    });
    
    test.skip('Rechazar solicitud', async () => {  
        const response = await api.post(`/follows/response`).type('form').send({request_id: REQUEST_ID, action: "reject"}).set('token', TEST_TOKEN2);
        console.log(response.body)
        expect(response.statusCode).toBe(200);   
        expect(response.body).toStrictEqual({});
    });

    test.skip('Aceptar solicitud previamente aceptada o rechazada', async () => { 
        const response = await api.post(`/follows/response`).type('form').send({request_id: REQUEST_ID, action: "accept"}).set('token', TEST_TOKEN2);
        expect(response.statusCode).toBe(400);        
        expect(response.body.error).toBe('The user has already accepted the follow request.');
    });

    test.skip('Rechazar solicitud previamente aceptada o rechazada', async () => { 
        const response = await api.post(`/follows/response`).type('form').send({request_id: REQUEST_ID, action: "reject"}).set('token', TEST_TOKEN2);
        expect(response.statusCode).toBe(400);        
        expect(response.body.error).toBe('The user has already rejected the follow request.');
    });
});

afterAll(async () => {
    server.close();
    await mongoose.connection.close();
});