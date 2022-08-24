const pool = require('../utils/pool');

module.exports = class Todo {
  id;
  created_at;
  details;
  status;
  user_id;


  constructor(row) {
    this.id = row.id;
    this.created_at = row.created_at;
    this.details = row.details;
    this.status = row.status;
    this.user_id = row.user_id;
  }

  static async getAllTask(user_id) {
    const { rows } = await pool.query(
      `SELECT * FROM
          todo_list
          WHERE user_id = $1`,
      [user_id]
    );
    return rows.map((row) => new Todo(row[0]));
  }

};




