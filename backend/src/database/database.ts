import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

class DatabaseManager {
  private db: Database;

  constructor() {
    this.db = new sqlite3.Database('./todos.db', (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('Connected to SQLite database');
        this.initializeTables();
      }
    });
  }

  private initializeTables(): void {
    const createTodosTable = `
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.run(createTodosTable, (err) => {
      if (err) {
        console.error('Error creating todos table:', err.message);
      } else {
        console.log('Todos table initialized');
      }
    });
  }

  getDatabase(): Database {
    return this.db;
  }

  close(): void {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

export default new DatabaseManager();