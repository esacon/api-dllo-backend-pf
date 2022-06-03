const supertest = require('supertest');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const { app, server } = require('../server');
const userModel = require('../models/users.model');

/**
 * Login
   * Informacion valida
   * Informacion invalida (usuario no existe)
   * Informacion invalida (contraseña incorrecta)
 * Registro
   * Informacion completa
   * Informacion incompleta
 */

require('dotenv').config({ path: path.resolve(__dirname, '../database/.env') });

const api = supertest(app);

const TEST_TOKEN = process.env.TEST_TOKEN; 
const USER_ID = "629804e0a09e3be16918b548";

const validateToken = accessToken => {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
}

describe('users/ route', () => {
    test('Login con username y password válido', async () => {
        const loginData = {
            username: "esaconn",
            password: "admin1234"
        }
        const response = await api.post(`/users/login`).type('form').send(loginData);
        expect(response.statusCode).toBe(200);
        const decoded = validateToken(response.body.token);
        expect(decoded.name).toBe(loginData.username);
    });
    
    test('Informacion inválida (usuario no existe)', async () => {
        const loginData = {
            username: "esa",
            password: "admin1234"
        }
        const response = await api.post(`/users/login`).type('form').send(loginData);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Invalid user or password.");
    });

        test('Informacion inválida (contraseña incorrecta)', async () => {
        const loginData = {
            username: "esaconn",
            password: "as"
        }
        const response = await api.post(`/users/login`).type('form').send(loginData);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Invalid user or password.");
    });
    
    test('Login con token válido', async () => {
        const response = await api.post(`/users/login`).type('form').send({token: TEST_TOKEN});
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    test('Registro información completa', async () => {
        const registerData = {
            username: "esaconnf",
            password: "admin1234",
            email: "prueba@gmail.com",
            birthdate: "28/12/2000",
            bio: "Not too young"
        }
        await userModel.findOneAndDelete({username: registerData.username});
        const response = await api.post(`/users`).type('form').send(registerData);
        expect(response.statusCode).toBe(201);
        const decoded = validateToken(response.body.token);
        expect(decoded.name).toBe(registerData.username);
    });
    
    test('No registro información incompleta', async () => {
        const registerData = {
            username: "esaconnf",
            password: "admin1234",
            email: "prueba@gmail.com",
            bio: "Not too young"
        }
        await userModel.findOneAndDelete({username: registerData.username});
        const response = await api.post(`/users`).type('form').send(registerData);
        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Información incompleta.');
    });
    
    test('Informacion de Usuario', async () => {
        const unexpectedData = ['password', 'birthdate'];
        const userResponse = await api.get(`/users?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(userResponse.statusCode).toBe(200);
        expect(Object.keys(userResponse.body)).not.toContain(unexpectedData);

        const followers = await api.get(`/follows/followers?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(userResponse.followers_count).toBe(followers.length);

        const following = await api.get(`/follows/following?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(userResponse.followed_count).toBe(following.length);

        const post = await api.get(`/follows/following?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(userResponse.posts_count).toBe(post.length);

        const liked = await api.get(`/posts/liked-by?user_id=${USER_ID}`).set('token', TEST_TOKEN);
        expect(userResponse.liked_count).toBe(liked.length);
    });
});

///////////////////////////////////////////////////////////////////////////////////

afterAll(async () => {
    server.close();
    await mongoose.connection.close();
});