<template>
  <div class="project-table table">
    <table>
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column.key"
            class="cell"
            @click="sort(column)"
          >
            {{ column.label }}
            <span v-if="column.sortable"> &#x25bc; </span>
            <input @click.stop v-if="column.key === 'name'" v-model.trim="nameFilter" />
            <select @click.stop v-if="column.key === 'status'" id="status" v-model="statusFilter">
              <option
                v-for="statusOption in projectStatusOptions"
                :key="statusOption.value ?? '1'"
                :value="statusOption.value"
              >
                {{ statusOption.label }}
              </option>
            </select>
            <ColumnResizer v-if="index < columns.length - 1" :index="index" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="project in filteredProjects"
          :key="project.id"
          class="table__row table__row--link"
          @click="navigateToProject(project.id)"
        >
          <td v-for="(column, index) in columns" class="cell" :key="column.key">
            <span v-if="column.key !== 'action'">
              {{
                column.key === 'createdAt' ? formatDate(project[column.key]) : project[column.key]
              }}
            </span>
            <div v-else class="table__actions">
              <button class="btn" @click.stop="editProject(project.id)">Edit</button>
              <button class="btn" @click.stop="deleteProject(project.id)">Delete</button>
            </div>
            <ColumnResizer v-if="index < columns.length - 1" :index="index" />
          </td>
        </tr>
      </tbody>
    </table>
    <ModalWindow :show="showModal" @close-window="modalToggler">
      <ProjectHandler :projectId="curProjectId" @modalToggler="modalToggler" />
    </ModalWindow>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Column, Project } from '@/interface/project'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import { formatDate } from '@/utils/formatDate'
import ModalWindow from '@/components/common/ModalWindow.vue'
import ProjectHandler from '@/components/ProjectHandler.vue'
import ColumnResizer from '@/components/common/ColumnResizer.vue'

const projectStore = useProjectStore()

const router = useRouter()

const columns = ref<Column[]>([
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'tasksCount', label: 'Tasks Count', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'createdAt', label: 'Created At', sortable: true },
  { key: 'action', label: 'Action' },
])

const props = defineProps<{
  projects: Project[]
}>()

const showModal = ref(false)
const statusFilter = ref<Project['status'] | null>(null)
const nameFilter = ref<string | null>(null)
const curProjectId = ref<null | number>(null)
const sortKey = ref<keyof Project | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

function getProjectStatusOptions(): { value: Project['status'] | null; label: string }[] {
  return [
    { value: 'Completed', label: 'Completed' },
    { value: 'Active', label: 'Active' },
    { value: 'New', label: 'New' },
    { value: null, label: 'Status' },
  ]
}
const projectStatusOptions = computed(() => getProjectStatusOptions())

const navigateToProject = (id: number) => {
  router.push(`/project/${id}`)
}

const editProject = (id: number) => {
  curProjectId.value = id
  showModal.value = true
}
const deleteProject = (id: number) => {
  projectStore.deleteCurProject(id)
}
const modalToggler = () => {
  showModal.value = false
}

const sort = (column: Column) => {
  if (column.sortable && column.key !== sortKey.value) {
    sortKey.value = column.key as keyof Project
    sortOrder.value = 'asc'
  } else if (column.sortable && column.key === sortKey.value) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }
}

const filterProjects = (arr: Project[]) => {
  return arr.filter((p) => {
    const status = statusFilter.value ? p.status === statusFilter.value : true
    const name = nameFilter.value
      ? p.name.toLowerCase().includes(nameFilter.value.toLowerCase())
      : true
    return status && name
  })
}

const filteredProjects = computed(() => {
  return filterProjects(props.projects).sort((a, b) => {
    if (sortKey.value !== null) {
      if (sortOrder.value === 'asc') {
        return a[sortKey.value] > b[sortKey.value] ? 1 : -1
      } else {
        return a[sortKey.value] < b[sortKey.value] ? 1 : -1
      }
    }
    return 0
  })
})
</script>

<style scoped lang="scss">
.project-table {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f2;
      cursor: pointer;
    }
  }
}
</style>
