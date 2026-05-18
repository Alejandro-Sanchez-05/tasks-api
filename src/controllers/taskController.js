const { sql, poolPromise } = require('../config/db');

// CREATE TASK
const createTask = async (req, res) => {
  const { title, description, status, due_date } = req.body;
  const user_id = req.user.id;

  try {
    if (!title) {
  return res.status(400).json({ error: true, message: 'Title is required' });
}

const validStatuses = ['pending', 'in_progress', 'done'];
if (status && !validStatuses.includes(status)) {
  return res.status(400).json({ error: true, message: 'Status must be pending, in_progress or done' });
}

    const pool = await poolPromise;

    await pool.request()
      .input('title', sql.VarChar, title)
      .input('description', sql.VarChar, description || null)
      .input('status', sql.VarChar, status || 'pending')
      .input('due_date', sql.Date, due_date || null)
      .input('user_id', sql.Int, user_id)
      .query('INSERT INTO tasks (title, description, status, due_date, user_id) VALUES (@title, @description, @status, @due_date, @user_id)');

    res.status(201).json({ message: 'Task created' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL TASKS
const getTasks = async (req, res) => {
  const user_id = req.user.id;
  const { status, due_date } = req.query;

  try {
    const pool = await poolPromise;

    let query = 'SELECT * FROM tasks WHERE user_id = @user_id';
    const request = pool.request().input('user_id', sql.Int, user_id);

    if (status) {
      query += ' AND status = @status';
      request.input('status', sql.VarChar, status);
    }

    if (due_date) {
      query += ' AND due_date = @due_date';
      request.input('due_date', sql.Date, due_date);
    }

    const result = await request.query(query);
    res.json(result.recordset);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE TASK
const getTask = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('user_id', sql.Int, user_id)
      .query('SELECT * FROM tasks WHERE id = @id AND user_id = @user_id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.recordset[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;

  try {
    const pool = await poolPromise;

    const existing = await pool.request()
      .input('id', sql.Int, id)
      .input('user_id', sql.Int, user_id)
      .query('SELECT * FROM tasks WHERE id = @id AND user_id = @user_id');

    if (existing.recordset.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.VarChar, title)
      .input('description', sql.VarChar, description || null)
      .input('status', sql.VarChar, status || 'pending')
      .input('due_date', sql.Date, due_date || null)
      .query('UPDATE tasks SET title = @title, description = @description, status = @status, due_date = @due_date WHERE id = @id');

    res.json({ message: 'Task updated' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;

  try {
    const pool = await poolPromise;

    const existing = await pool.request()
      .input('id', sql.Int, id)
      .input('user_id', sql.Int, user_id)
      .query('SELECT * FROM tasks WHERE id = @id AND user_id = @user_id');

    if (existing.recordset.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM tasks WHERE id = @id');

    res.json({ message: 'Task deleted' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };