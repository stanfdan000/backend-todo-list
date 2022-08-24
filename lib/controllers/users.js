const { Router } = require('express');
const UserService = require('../services/UserServices');
const jwt = require('jsonwebtoken');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
// const authenticate = require('../middleware/authenticate');
module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      console.log(req.body);
      const user = await UserService.create(req.body);
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json(user);
      console.log(user);
    } catch (error) {
      next(error);
    }
  });
