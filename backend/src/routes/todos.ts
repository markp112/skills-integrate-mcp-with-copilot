import { Router, Request, Response } from 'express';
import { Database } from 'sqlite3';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../models/Todo';
import databaseManager from '../database/database';

const router = Router();
const db: Database = databaseManager.getDatabase();

// GET /api/todos - Get all todos
router.get('/', (req: Request, res: Response) => {
  const sql = 'SELECT * FROM todos ORDER BY created_at DESC';
  
  db.all(sql, [], (err, rows: Todo[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET /api/todos/:id - Get a specific todo
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM todos WHERE id = ?';
  
  db.get(sql, [id], (err, row: Todo) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.json(row);
  });
});

// POST /api/todos - Create a new todo
router.post('/', (req: Request, res: Response) => {
  const { title, description }: CreateTodoRequest = req.body;
  
  if (!title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }
  
  const sql = 'INSERT INTO todos (title, description) VALUES (?, ?)';
  
  db.run(sql, [title, description || ''], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Get the created todo
    const selectSql = 'SELECT * FROM todos WHERE id = ?';
    db.get(selectSql, [this.lastID], (err, row: Todo) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json(row);
    });
  });
});

// PUT /api/todos/:id - Update a todo
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed }: UpdateTodoRequest = req.body;
  
  // Build dynamic update query
  const updates: string[] = [];
  const values: any[] = [];
  
  if (title !== undefined) {
    updates.push('title = ?');
    values.push(title);
  }
  if (description !== undefined) {
    updates.push('description = ?');
    values.push(description);
  }
  if (completed !== undefined) {
    updates.push('completed = ?');
    values.push(completed);
  }
  
  if (updates.length === 0) {
    res.status(400).json({ error: 'No valid fields to update' });
    return;
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const sql = `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`;
  
  db.run(sql, values, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    
    // Get the updated todo
    const selectSql = 'SELECT * FROM todos WHERE id = ?';
    db.get(selectSql, [id], (err, row: Todo) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  });
});

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todos WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    
    res.json({ message: 'Todo deleted successfully' });
  });
});

export default router;