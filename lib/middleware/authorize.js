const User = require('../models/User');


module.exports = async (req, res, next) => {
  try {
    const users = await User.getById(req.user.id);
    if (!users || users.id !== req.user.id) {
      throw new Error('access denied');
    }
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
 

  
  
