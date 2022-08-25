const { Router } = require('express');
const Todo = require('../models/Todo');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');


module.exports = Router() 
  .get('/', authenticate, async (req, res, next) =>  {
    try {
      const todo = await Todo.getAllTask(req.user.id);
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
