const pool = require('../utils/pool');

module.exports = class Todo {
  id;
  created_at;
  detail;
  status;
  user_id;


  constructor(row) {
    this.id = row.id;
    this.created_at = row.created_at;
    this.detail = row.detail;
    this.status = row.status;
    this.user_id = row.user_id;
  }

  static async getAllTask(id) {
    console.log(id);
    const { rows } = await pool.query(
      `SELECT * FROM
          todo_list
          WHERE user_id = $1`,
      [id]
    );
    console.log(rows);
    
    return rows.map((row) => new Todo(row));
  }

  static async insertTask({ detail, user_id }) {
    const { rows } = await pool.query(`
      INSERT INTO todo_list (detail, user_id)
      VALUES ($1, $2)
      RETURNING *;`,
    [detail, user_id]
    );
    return new Todo(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(`
    SELECT * FROM todo_list
    WHERE id = $1`, 
    [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Todo(rows[0]);
  }


  static async updateById(id, attrs) {
    const todo = await Todo.getById(id);
    if (!todo) return null;
    const { detail, user_id, status } = { ...todo, ...attrs };
    const { rows } = await pool.query(
      `UPDATE todo_list
    SET detail = $2, user_id = $3, status = $4 
    WHERE id = $1 RETURNING *`,
      [id, detail, user_id, status]
      ,
    );
    return new Todo(rows[0]);
  }
};




