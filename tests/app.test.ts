import request from 'supertest';
import app from '../src/app';

describe('Express App', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Not Found');
  });

  it('should handle health route', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
