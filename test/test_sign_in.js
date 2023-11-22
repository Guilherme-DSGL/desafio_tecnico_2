/* eslint-disable no-undef */
const request = require('supertest');
const {expect} = require('expect');
const app = require('../src/index');
const userUrls = require('../src/common/constants/routes');
const userRegisterMock = require('./fixtures/req_user_sign_up.json');
const statusCode = require('../src/common/constants/statusCode');

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