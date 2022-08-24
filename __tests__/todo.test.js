const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Todo = require('../lib/models/Todo');
// const UserService = require('../lib/services/UserServices');




const registerAndLogin = async (userProps = {}) => {
  // const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const resp = await agent
    .post('/api/v1/users')
    .send({ ...mockUser, ...userProps });
  const user = resp.body;
  return [agent, user];
};


const mockUser = {
  firstName: 'oliver',
  lastName: 'eingrid',
  email: 'meatbogeldegoop@example.com',
  password: '123456',
};

const newTask = {
  detail: 'Added a task',

};

const agent = request.agent(app);



describe('the Todo Test suite', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
    
  it('adds new todo for user', async () => {
    await agent.post('/api/v1/users').send(mockUser);
    const res = await agent.post('/api/v1/todo').send(newTask);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      detail: 'Added a task', 
      user_id: expect.any(String),
      status: false,
    });
  });

  it('updates todo list /:id ', async () => {
    const [agent, user] = await registerAndLogin();
    const todo = await Todo.insert({
      id: expect.any(String),
      created_at: expect.any(String),
      detail: 'Updated a task', 
      user_id: user.id,
      status: false,
    });
    const resp = await agent
      .put(`/api/v1/todo/${todo.id}`)
      .send({ status: false });

    expect(resp.body).toEqual({ ...todo, status: false });
  });

});
