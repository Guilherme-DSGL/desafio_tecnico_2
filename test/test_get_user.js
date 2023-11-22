/* eslint-disable no-undef */
const request = require('supertest');
const {expect} = require('expect');
const app = require('../src/index');
const userUrls = require('../src/common/constants/routes');
const statusCode = require('../src/common/constants/statusCode');

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