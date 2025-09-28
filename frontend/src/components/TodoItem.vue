<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-content">
      <div class="todo-main">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="todo.id && $emit('toggle', todo.id)"
          class="todo-checkbox"
        />
        <div class="todo-text" v-if="!isEditing">
          <h3 class="todo-title">{{ todo.title }}</h3>
          <p v-if="todo.description" class="todo-description">{{ todo.description }}</p>
          <span class="todo-date">Created: {{ formatDate(todo.created_at) }}</span>
        </div>
        <div class="todo-edit" v-else>
          <input
            v-model="editTitle"
            @keyup.enter="saveEdit"
            @keyup.escape="cancelEdit"
            class="edit-title"
            ref="titleInput"
          />
          <textarea
            v-model="editDescription"
            @keyup.escape="cancelEdit"
            class="edit-description"
            rows="2"
            placeholder="Description (optional)"
          ></textarea>
        </div>
      </div>
      <div class="todo-actions">
        <button
          v-if="!isEditing"
          @click="startEdit"
          class="btn btn-edit"
          title="Edit todo"
        >
          ✏️
        </button>
        <button
          v-if="isEditing"
          @click="saveEdit"
          class="btn btn-save"
          title="Save changes"
        >
          ✅
        </button>
        <button
          v-if="isEditing"
          @click="cancelEdit"
          class="btn btn-cancel"
          title="Cancel editing"
        >
          ❌
        </button>
        <button
          @click="todo.id && $emit('delete', todo.id)"
          class="btn btn-delete"
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Todo, UpdateTodoRequest } from '@/types/todo'

interface Props {
  todo: Todo
}

interface Emits {
  (e: 'toggle', id: number): void
  (e: 'update', id: number, data: UpdateTodoRequest): void
  (e: 'delete', id: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isEditing = ref(false)
const editTitle = ref('')
const editDescription = ref('')
const titleInput = ref<HTMLInputElement>()

const formatDate = (dateString?: string): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}

const startEdit = async () => {
  isEditing.value = true
  editTitle.value = props.todo.title
  editDescription.value = props.todo.description || ''
  
  await nextTick()
  titleInput.value?.focus()
}

const saveEdit = () => {
  if (editTitle.value.trim()) {
    emit('update', props.todo.id!, {
      title: editTitle.value.trim(),
      description: editDescription.value.trim() || undefined
    })
    isEditing.value = false
  }
}

const cancelEdit = () => {
  isEditing.value = false
  editTitle.value = ''
  editDescription.value = ''
}
</script>

<style scoped>
.todo-item {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.todo-item.completed {
  opacity: 0.7;
  background-color: #f8f9fa;
}

.todo-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.todo-main {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.todo-checkbox {
  margin-top: 0.25rem;
  transform: scale(1.2);
}

.todo-text {
  flex: 1;
}

.todo-title {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #6c757d;
}

.todo-description {
  margin: 0 0 0.5rem 0;
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.4;
}

.todo-date {
  font-size: 0.8rem;
  color: #adb5bd;
}

.todo-edit {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-title {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
}

.edit-description {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.btn {
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #f8f9fa;
}

.btn-edit:hover {
  background-color: #e3f2fd;
}

.btn-save:hover {
  background-color: #e8f5e8;
}

.btn-cancel:hover {
  background-color: #ffeaa7;
}

.btn-delete:hover {
  background-color: #ffebee;
}
</style>