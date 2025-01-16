<template>
  <form @submit.prevent="saveCurProject" class="form">
    <h3 class="form__title">{{ projectId ? 'Edit project' : 'Add project' }}</h3>

    <div class="form__group">
      <label for="name" class="form-group__label">Name</label>
      <input
        id="name"
        v-model="project.name"
        class="form-group__input"
        @input="setName"
        type="text"
        required
      />
    </div>
    <div class="form__group">
      <label for="description" class="form-group__label">Description</label>
      <input
        id="description"
        v-model="project.description"
        @input="setDescription"
        type="text"
        class="form-group__input"
        required
      />
    </div>

    <div class="form__group">
      <label for="status" class="form-group__label">Status</label>
      <select id="status" v-model="project.status" class="form-group__input" @change="setStatus">
        <option
          v-for="statusOption in projectStatusOptions"
          :key="statusOption.value"
          :value="statusOption.value"
        >
          {{ statusOption.label }}
        </option>
      </select>
    </div>

    <div class="form__group form__group--action">
      <button class="btn" type="submit">Save Project</button>
      <button class="btn" type="reset" @click="$emit('modalToggler')">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProjectForm } from '@/composables/useProjectForm'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()
const props = defineProps(['projectId'])
const emits = defineEmits(['modalToggler'])

const {
  project,
  setName,
  setStatus,
  saveProject,
  setDescription,
  editProject,
  projectStatusOptions,
} = useProjectForm()

const saveCurProject = async () => {
  if (props.projectId) {
    await editProject()
  } else {
    await saveProject()
  }
  emits('modalToggler')
}

onMounted(async () => {
  if (props.projectId) {
    await projectStore.getCurrentProject(props.projectId)
    if (projectStore.project) {
      project.value = projectStore.project
    }
  }
})
</script>
