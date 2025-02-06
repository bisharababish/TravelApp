import { app, server } from '../server/server';
import request from 'supertest';

describe('Express Server', () => {
  afterAll((done) => {
    server.close(done); 
  });

  it('should respond with 200 status for the home route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Welcome to the Travel App API');
  });

  it('should respond with 404 status for an invalid route', async () => {
    const res = await request(app).get('/invalid-route');
    expect(res.status).toBe(404);
    expect(res.text).toBe('Route not found');
  });
});
