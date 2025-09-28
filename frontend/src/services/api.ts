import axios from 'axios'
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '@/types/todo'

const API_BASE_URL = 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const todoApi = {
  // Get all todos
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos')
    return response.data
  },

  // Get a specific todo
  getTodo: async (id: number): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`)
    return response.data
  },

  // Create a new todo
  createTodo: async (todo: CreateTodoRequest): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', todo)
    return response.data
  },

  // Update a todo
  updateTodo: async (id: number, todo: UpdateTodoRequest): Promise<Todo> => {
    const response = await api.put<Todo>(`/todos/${id}`, todo)
    return response.data
  },

  // Delete a todo
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`)
  },

  // Toggle todo completion
  toggleTodo: async (id: number, completed: boolean): Promise<Todo> => {
    return todoApi.updateTodo(id, { completed })
  },
}