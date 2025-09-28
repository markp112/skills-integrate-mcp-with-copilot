import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { todoApi } from '@/services/api'
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '@/types/todo'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const completedTodos = computed(() => todos.value.filter(todo => todo.completed))
  const pendingTodos = computed(() => todos.value.filter(todo => !todo.completed))

  const fetchTodos = async () => {
    loading.value = true
    error.value = null
    try {
      todos.value = await todoApi.getAllTodos()
    } catch (err) {
      error.value = 'Failed to fetch todos'
      console.error('Error fetching todos:', err)
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (todoData: CreateTodoRequest) => {
    loading.value = true
    error.value = null
    try {
      const newTodo = await todoApi.createTodo(todoData)
      todos.value.unshift(newTodo)
    } catch (err) {
      error.value = 'Failed to add todo'
      console.error('Error adding todo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTodo = async (id: number, todoData: UpdateTodoRequest) => {
    loading.value = true
    error.value = null
    try {
      const updatedTodo = await todoApi.updateTodo(id, todoData)
      const index = todos.value.findIndex(todo => todo.id === id)
      if (index !== -1) {
        todos.value[index] = updatedTodo
      }
    } catch (err) {
      error.value = 'Failed to update todo'
      console.error('Error updating todo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTodo = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await todoApi.deleteTodo(id)
      todos.value = todos.value.filter(todo => todo.id !== id)
    } catch (err) {
      error.value = 'Failed to delete todo'
      console.error('Error deleting todo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const toggleTodo = async (id: number) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      await updateTodo(id, { completed: !todo.completed })
    }
  }

  return {
    todos,
    loading,
    error,
    completedTodos,
    pendingTodos,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  }
})