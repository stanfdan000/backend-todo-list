const { Router } = require('express');
const Todo = require('../models/Todo');
const authenticate = require('../middleware/authenticate');


module.export = Router() 
  .get('/', authenticate, async (req, res, next) =>  {
    try {
      const todo = await Todo.getAllTask(req.user.id);
      res.json(todo);
        
    } catch (error) {
      next(error);
    }
  });
