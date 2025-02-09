import request from 'supertest';
import app from '../server/server.js';

describe('Express Server', () => {
  it('should respond with 200 status for the home route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with 404 status for an invalid route', async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.statusCode).toBe(404);
  });
});