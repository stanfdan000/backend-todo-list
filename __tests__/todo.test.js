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
  status: false,

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
    
    await agent.post('/api/v1/users').send(mockUser);
    let res = await agent.post('/api/v1/todo').send(newTask);
    const updateTodo = {
      status: true
    };
    
    res = await agent.put('/api/v1/todo/1').send(updateTodo);
    console.log(res.body);
    // expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });



  it('todo all list tasks for auth user', async () => {
    const [agent] = await registerAndLogin();
    await agent.post('/api/v1/users').send(mockUser);
    // const addTask = await agent.post('/api/v1/todo').send(newTask);
    const res = await agent.get('/api/v1/todo');
    
    // expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      user_id: expect.any(String),
      created_at: expect.any(String),
      detail: expect.any(String),
      status: expect.any(Boolean),
    });
  });











});
