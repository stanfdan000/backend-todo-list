const User = require('../models/User');


module.exports = async (req, res, next) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user || user.user_id !== req.user.id) {
      throw new Error('access denied');
    }
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
 

  
  
