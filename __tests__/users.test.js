const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const UserService = require('../lib/services/UserServices');

const mockUser = {
  firstName: 'oliver',
  lastName: 'eingrid',
  email: 'meatbogeldegoop@example.com',
  password: '123456',
};

const registerAndLogin = async (userProps = {}) => {
  // const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const resp = await agent
    .post('/api/v1/users')
    .send({ ...mockUser, ...userProps });
  const user = resp.body;
  return [agent, user];
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


  it('creates new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('logs in an existing user', async () => {
    const [agent, mockUser] = await registerAndLogin();
    const res = await agent.get('/api/v1/users/session').send(mockUser);
    const { firstName, lastName, email } = mockUser;

    // expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
      exp: expect.any(Number),
      iat: expect.any(Number)
    });
  });
});









