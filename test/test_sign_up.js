/* eslint-disable no-undef */
const request = require('supertest');
const {expect} = require('expect');
const app = require('../src/index');
const userUrls = require('../src/common/constants/routes');
const userRegisterMock = require('./fixtures/req_user_sign_up.json');
const statusCode = require('../src/common/constants/statusCode');

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
