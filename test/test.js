/* eslint-disable no-undef */
const request = require('supertest');
const {expect} = require('expect');
const app = require('../src/index');
const userUrls = require('../src/common/constants/routes');

const userRegisterMock = require('./fixtures/req_user_sign_up.json');
const statusCode = require('../src/common/constants/statusCode');

describe('Tests middlewares', () => {
    it('Deve retornar status 404 rota não encontrada quando a rota não existir', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({});
        console.log(response.body);
        expect(response.status).toBe(statusCode.NOT_FOUND);
    });

    it('Deve retornar status 415 o conteúdo não é um json', async () => {
        const response = await request(app)
            .post(userUrls.signUp)
            .send('');
        console.log(response.body);
        expect(response.status).toBe(statusCode.UNSUSPORTED_MEDIA_TYPE);
    });
});

describe('Teste POST - singUp', () => {
    it('Deve retornar status 422 email inválido', async () => {
        const userError = {...userRegisterMock};
        userError.email = '';
        const response = await request(app)
            .post(userUrls.signUp)
            .send(userError);
        console.log(response.body);
        expect(response.status).toBe(statusCode.UNPROCESSABLE_ENTITY);
    });
    it('Deve retornar status 422 nome inválido', async () => {
        const userError = {...userRegisterMock};
        userError.nome = undefined;
        const response = await request(app)
            .post(userUrls.signUp)
            .send(userError);
        console.log(response.body);
        expect(response.status).toBe(statusCode.UNPROCESSABLE_ENTITY);
    });
    it('Deve retornar status 422 senha inválida', async () => {
        const userError = {...userRegisterMock};
        userError.senha = undefined;
        const response = await request(app)
            .post(userUrls.signUp)
            .send(userError);
        console.log(response.body);
        expect(response.status).toBe(statusCode.UNPROCESSABLE_ENTITY);
    });
    it('Deve retornar status 422 telefones inválidos', async () => {
        const userError = {...userRegisterMock};
        userError.telefones = undefined;
        const response = await request(app)
            .post(userUrls.signUp)
            .send(userError);
        console.log(response.body);
        expect(response.status).toBe(statusCode.UNPROCESSABLE_ENTITY);
    });
});

describe('Teste POST - singIn', () => {
    it('Deve retornar status 422 nome inválido', async () => {
        const userError = {...userRegisterMock};
        userError.email = undefined;
        const response = await request(app)
            .post(userUrls.signIn)
            .send(userError);
        console.log(response.body);
        expect(response.status).toBe(statusCode.UNPROCESSABLE_ENTITY);
    });

    it('Deve retornar status 422 senha inválida', async () => {
        const userError = {...userRegisterMock};
        userError.senha = undefined;
        const response = await request(app)
            .post(userUrls.signIn)
            .send(userError);
        console.log(response.body);
        expect(response.status).toBe(statusCode.UNPROCESSABLE_ENTITY);
    });
    it('Deve retornar status 401 senha icorreta', async () => {
        const userError = {...userRegisterMock};
        userError.senha = 'asdasd';
        const response = await request(app)
            .post(userUrls.signIn)
            .send(userError).timeout(10000);
        console.log(response.body);
        expect(response.status).toBe(statusCode.UN_AUTHORIZED);
        
    });
    it('Deve retornar status 401 usuário não existe', async () => {
        const userError = {...userRegisterMock};
        userError.email = 'test@tes.com';
        const response = await request(app)
            .post(userUrls.signIn)
            .send(userError).timeout(10000);
        console.log(response.body);
        expect(response.status).toBe(statusCode.UN_AUTHORIZED);
       
    });
});

describe('Teste GET - getUser', () => {
    it('Deve retornar status 401 token inválido', async () => {
        const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVTTTJ9.eyJpZCI6IjY1NWM5MzE5Njc2MmExMTc5NDA2MDQ4OSIsImlhdCI6MTcwMDU2NTc4NSwiZXhwIjoxNzAwNTY3NTg1fQ.yhzFxjupmaL5VA4wkRkt-1ersFEKsLeny09OdZt54G4';
        const response =  await request(app)
            .get(userUrls.getUser).set('Authentication', `Bearer ${invalidToken}`);
        console.log(response.body);
        expect(response.status).toBe(statusCode.UN_AUTHORIZED);
    });

    it('Deve retornar status 401 token expirado', async () => {
        const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWM5MzE5Njc2MmExMTc5NDA2MDQ4OSIsImlhdCI6MTcwMDU2NTc4NSwiZXhwIjoxNzAwNTY3NTg1fQ.yhzFxjupmaL5VA4wkRkt-1ersFEKsLeny09OdZt54G4';
        const response = await request(app)
            .get(userUrls.getUser).set('Authentication', `Bearer ${expiredToken}`);
        console.log(response.body);
        expect(response.status).toBe(statusCode.UN_AUTHORIZED);
    });
});


