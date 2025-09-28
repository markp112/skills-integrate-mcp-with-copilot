<template>
  <div class="todos-container">
    <div class="todos-header">
      <h1>Todo List</h1>
      <p class="stats">
        {{ pendingTodos.length }} pending, {{ completedTodos.length }} completed
      </p>
    </div>

    <div class="add-todo-section">
      <AddTodoForm @todo-added="handleTodoAdded" />
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="loading" class="loading">
      Loading todos...
    </div>

    <div v-else class="todos-list">
      <div v-if="todos.length === 0" class="empty-state">
        <p>No todos yet. Add one above to get started!</p>
      </div>
      
      <div v-else>
        <div v-if="pendingTodos.length > 0" class="todos-section">
          <h2>Pending Tasks</h2>
          <TodoItem
            v-for="todo in pendingTodos"
            :key="todo.id"
            :todo="todo"
            @toggle="handleToggle"
            @update="handleUpdate"
            @delete="handleDelete"
          />
        </div>

        <div v-if="completedTodos.length > 0" class="todos-section">
          <h2>Completed Tasks</h2>
          <TodoItem
            v-for="todo in completedTodos"
            :key="todo.id"
            :todo="todo"
            @toggle="handleToggle"
            @update="handleUpdate"
            @delete="handleDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodosStore } from '@/stores/todos'
import TodoItem from '@/components/TodoItem.vue'
import AddTodoForm from '@/components/AddTodoForm.vue'
import type { UpdateTodoRequest } from '@/types/todo'

const todosStore = useTodosStore()
const { todos, loading, error, pendingTodos, completedTodos } = storeToRefs(todosStore)

onMounted(() => {
  todosStore.fetchTodos()
})

const handleTodoAdded = () => {
  // Todo added successfully, list will update automatically via store
}

const handleToggle = async (id: number) => {
  try {
    await todosStore.toggleTodo(id)
  } catch (error) {
    console.error('Error toggling todo:', error)
  }
}

const handleUpdate = async (id: number, todoData: UpdateTodoRequest) => {
  try {
    await todosStore.updateTodo(id, todoData)
  } catch (error) {
    console.error('Error updating todo:', error)
  }
}

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this todo?')) {
    try {
      await todosStore.deleteTodo(id)
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }
}
</script>

<style scoped>
.todos-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.todos-header {
  text-align: center;
  margin-bottom: 2rem;
}

.todos-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.stats {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.add-todo-section {
  margin-bottom: 2rem;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border-left: 4px solid #dc3545;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.todos-section {
  margin-bottom: 2rem;
}

.todos-section h2 {
  color: #495057;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}
</style>