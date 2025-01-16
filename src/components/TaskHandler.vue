<template>
  <form @submit.prevent="saveCurTask" class="form">
    <h3 class="form__title">{{ taskId ? 'Edit task' : 'Add task' }}</h3>
    <div class="form__group">
      <label for="name" class="form-group__label">Title</label>
      <input
        id="name"
        class="form-group__input"
        v-model="task.title"
        @input="setTitle"
        type="text"
        required
      />
    </div>
    <div class="form__group">
      <label for="assignee" class="form-group__label">Assignee</label>
      <input
        id="assignee"
        class="form-group__input"
        v-model="task.assignee"
        @input="setAssignee"
        type="text"
      />
    </div>
    <div class="form__group">
      <label for="terminalExecution" class="form-group__label">Deadline</label>
      <input
        id="terminalExecution"
        class="form-group__input"
        v-model="task.terminalExecution"
        @input="setDeadline"
        type="date"
      />
    </div>

    <div class="form__group">
      <label for="status" class="form-group__label">Status</label>
      <select id="status" class="form-group__input" v-model="task.status" @change="setStatus">
        <option
          v-for="statusOption in taskStatusOptions"
          :key="statusOption.value"
          :value="statusOption.value"
        >
          {{ statusOption.label }}
        </option>
      </select>
    </div>
    <div class="form__group form__group--action">
      <button class="btn" type="submit">Save Task</button>
      <button class="btn" type="reset" @click="$emit('modalToggler')">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskForm } from '@/composables/useTaskForm'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const props = defineProps(['taskId'])
const emits = defineEmits(['modalToggler'])

const {
  task,
  setTitle,
  setStatus,
  saveTask,
  setDeadline,
  editTask,
  setAssignee,
  taskStatusOptions,
} = useTaskForm()

const saveCurTask = async () => {
  if (props.taskId) {
    await editTask()
  } else {
    await saveTask()
  }
  emits('modalToggler')
}

onMounted(async () => {
  if (props.taskId) {
    await taskStore.getCurrentTask(props.taskId)
    if (taskStore.task) {
      task.value = taskStore.task
    }
  }
})
</script>
