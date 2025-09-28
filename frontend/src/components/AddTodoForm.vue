<template>
  <div class="add-todo-form">
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <input
          v-model="title"
          type="text"
          placeholder="What needs to be done?"
          class="todo-input"
          :disabled="loading"
          required
        />
      </div>
      
      <div class="form-group">
        <textarea
          v-model="description"
          placeholder="Description (optional)"
          class="todo-textarea"
          :disabled="loading"
          rows="2"
        ></textarea>
      </div>
      
      <div class="form-actions">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading || !title.trim()"
        >
          {{ loading ? 'Adding...' : 'Add Todo' }}
        </button>
        
        <button
          type="button"
          @click="clearForm"
          class="btn btn-secondary"
          :disabled="loading"
          v-if="title || description"
        >
          Clear
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodosStore } from '@/stores/todos'

interface Emits {
  (e: 'todo-added'): void
}

const emit = defineEmits<Emits>()

const todosStore = useTodosStore()
const { loading } = storeToRefs(todosStore)

const title = ref('')
const description = ref('')

const handleSubmit = async () => {
  if (!title.value.trim()) return

  try {
    await todosStore.addTodo({
      title: title.value.trim(),
      description: description.value.trim() || undefined
    })
    
    clearForm()
    emit('todo-added')
  } catch (error) {
    console.error('Error adding todo:', error)
  }
}

const clearForm = () => {
  title.value = ''
  description.value = ''
}
</script>

<style scoped>
.add-todo-form {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.todo-input,
.todo-textarea {
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.todo-input:focus,
.todo-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.todo-input {
  font-size: 1.1rem;
  font-weight: 500;
}

.todo-textarea {
  resize: vertical;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #545b62;
}
</style>