
const User = require('../models/user');


module.exports = async (req, res, next) => {
  try {
    const user = await user.getById(req.params.id);
    if (!user || user.user_id !== req.user.id) {
      throw new Error('access denied');
    }
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
 
  
  
