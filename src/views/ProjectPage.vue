<template>
  <main>
    <DataChart :tasks="taskStore.tasks" />
    <div class="top-block">
      <h2 class="top-block__title">Projects tasks</h2>
      <button class="top-block__btn btn btn--main" @click="addNewTask">Add task</button>
    </div>
    <TasksTable :projectId="projectId" />
    <ModalWindow :show="showModal" @close-window="modalToggler">
      <TaskHandler @modalToggler="modalToggler" />
    </ModalWindow>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import TasksTable from '../components/TasksTable.vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import TaskHandler from '@/components/TaskHandler.vue'
import DataChart from '@/components/DataChart.vue'

const taskStore = useTaskStore()
const route = useRoute()
const projectId = +route.params.id

const showModal = ref(false)

const modalToggler = () => {
  showModal.value = false
}

const addNewTask = () => {
  showModal.value = true
}

onMounted(async () => {
  taskStore.setCurProjectId(projectId)
  await taskStore.getTasksListByProjectId(projectId)
})
</script>
