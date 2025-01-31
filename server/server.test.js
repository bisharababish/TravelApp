const request = require('supertest');
const app = require('./server');

describe('GET /', () => {
    it('responds with 200 status', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});