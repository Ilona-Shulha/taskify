<template>
  <main>
    <div class="top-block">
      <h2 class="top-block__title">Projects</h2>
      <button class="top-block__btn btn btn--main" @click="addNewProject">Add project</button>
    </div>
    <div v-if="projectStore.projectsLoading">Loading</div>
    <div v-else-if="!projectStore.projects.length">Ще нема проектів. Час створювати)</div>
    <ProjectsTable v-else :projects="projectStore.projects" />
    <ModalWindow :show="showModal" @close-window="modalToggler">
      <ProjectHandler @modalToggler="modalToggler" />
    </ModalWindow>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProjectStore } from '@/stores/project'
import ModalWindow from '@/components/common/ModalWindow.vue'
import ProjectsTable from '@/components/ProjectsTable.vue'
import ProjectHandler from '@/components/ProjectHandler.vue'

const projectStore = useProjectStore()
const showModal = ref(false)

onMounted(() => {
  projectStore.getProjectsList()
})

const modalToggler = () => {
  showModal.value = false
}

const addNewProject = () => {
  showModal.value = true
}
</script>
