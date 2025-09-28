import express from 'express';
import cors from 'cors';
import todosRouter from './routes/todos';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todosRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Todo API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  process.exit(0);
});