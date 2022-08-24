const bcrypt = require('bcrypt'); 
const User = require('../models/User');
const jwt = require('jsonwebtoken');



module.exports = class UserServices {
  static async create({ firstName, lastName, email, password }) {
    const passwordHash = await await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const user = await User.insert({ 
      firstName, lastName, email, passwordHash
    });
    return user;
  }
};
