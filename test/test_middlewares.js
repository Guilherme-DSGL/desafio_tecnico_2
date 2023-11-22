/* eslint-disable no-undef */
const request = require('supertest');
const {expect} = require('expect');
const app = require('../src/index');
const userUrls = require('../src/common/constants/routes');
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





