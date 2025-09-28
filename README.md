# Todo Application

A simple todo application built with Vue.js frontend and Node.js backend using TypeScript and SQLite database.

![Todo App Screenshot](https://github.com/user-attachments/assets/ce101164-f562-4f78-8482-c510b618d47a)

## Features

- ✅ Create new todos with title and optional description
- ✅ Mark todos as completed/pending
- ✅ Edit existing todos inline
- ✅ Delete todos with confirmation
- ✅ Automatic categorization into Pending and Completed sections
- ✅ Real-time todo count statistics
- ✅ Responsive and clean UI design
- ✅ SQLite database for data persistence

## Tech Stack

**Frontend:**
- Vue.js 3 with TypeScript
- Vue Router for navigation
- Pinia for state management
- Axios for API calls
- Custom CSS styling

**Backend:**
- Node.js with Express
- TypeScript
- SQLite3 database
- CORS enabled
- RESTful API design

## Project Structure

```
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── database/       # Database configuration
│   │   ├── models/         # TypeScript interfaces
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Vue.js frontend
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── views/         # Page views
│   │   ├── stores/        # Pinia stores
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript types
│   │   └── router/        # Vue Router config
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `GET /health` - Health check endpoint

## Database Schema

The SQLite database contains a single `todos` table:

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

1. **Add a Todo**: Fill in the title (required) and description (optional) in the form at the top, then click "Add Todo"
2. **Complete a Todo**: Click the checkbox next to a todo to mark it as completed
3. **Edit a Todo**: Click the ✏️ icon to edit the title and description inline
4. **Delete a Todo**: Click the 🗑️ icon and confirm to delete a todo

The application automatically organizes todos into "Pending Tasks" and "Completed Tasks" sections, and displays real-time statistics.
