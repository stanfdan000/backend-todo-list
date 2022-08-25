const { Router } = require('express');
const Todo = require('../models/Todo');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');


module.exports = Router() 
  .get('/', authenticate, async (req, res, next) =>  {
    try {
      
      const todo = await Todo.getAllTask(req.user.id);
      console.log(todo);
      res.json(todo);
        
    } catch (error) {
      next(error);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const todo = await Todo.insertTask({
        user_id: req.user.id,
        ...req.body });
      res.json(todo);
    } catch(error) {
      next(error);
    }
    
  })

  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const todo = await Todo.updateById(req.user.id, req.body);
      
      res.json(todo);
    } catch(error) {
      next(error);
    }
  });




// .get('/', authenticate, async (req, res, next) => {
//   try {
//     const allList = await Todo.getAllTask();
//     const todos = allList.map((todos) => ({ 
//       id: todo_list.id,
//       detail: todo_list.detail,
//       status: todo_list.status,
//       created_at: todo_list.created_at,
//     }));
//     res.json(todos);
//   } catch (error) {
//     next(error);
//   }
// });
