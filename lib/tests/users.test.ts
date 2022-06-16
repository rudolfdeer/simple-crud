import app from '../index';
import request from 'supertest';
const { service } = require('../service');

const user = {
  id: 'a79fe719-4b36-441c-94c6-d4a606584cb3',
  username: 'John Doe',
  age: 25,
  hobbies: [],
};

describe('users', () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    app.server.client.close();
    done();
  });

  it('should return all users on /GET api/users', async () => {
    const res = await request(app.server.client).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual([]);
  });

  it('should create user on /POST api/users', async () => {
    
    const body = { username: 'Tom', age: 30, hobbies: [] };
    const response = await request(app.server.client).post('/api/users').send(body);

    const res = JSON.parse(response.text);

    jest.spyOn(service, 'create').mockImplementation(() => res);

    expect(response.status).toBe(201);
    expect(res).toStrictEqual(await service.create(body));
  });

  it('should return user on /GET api/users/id', async () => {
    jest.spyOn(service, 'getById').mockImplementation(() => user);
    
    const response = await request(app.server.client).get('/api/users/a79fe719-4b36-441c-94c6-d4a606584cb3');
    const res = JSON.parse(response.text);
    expect(res).toStrictEqual(await service.getById('a79fe719-4b36-441c-94c6-d4a606584cb3'));
  });
});
