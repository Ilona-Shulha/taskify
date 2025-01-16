<template>
  <div>
    <table class="tasks-table table">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column.key"
            class="cell"
            @click="sort(column)"
          >
            {{ column.label }}
            <span v-if="column.sortable" class="filter-btn"> &#x25bc; </span>
            <input @click.stop v-if="column.key === 'assignee'" v-model.trim="assigneeFilter" />
            <select @click.stop v-if="column.key === 'status'" id="status" v-model="statusFilter">
              <option
                v-for="statusOption in taskStatusOptions"
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
        <tr v-for="task in filteredTasks" :key="task.id">
          <td v-for="(column, index) in columns" :key="column.key" class="cell">
            <span v-if="column.key !== 'action'">
              {{
                column.key === 'terminalExecution' ? formatDate(task[column.key]) : task[column.key]
              }}
            </span>
            <div v-else class="table__actions">
              <button class="btn" @click.stop="editTask(task.id)">Edit</button>
              <button class="btn" @click.stop="deleteTask(task.id)">Delete</button>
            </div>
            <ColumnResizer v-if="index < columns.length - 1" :index="index" />
          </td>
        </tr>
      </tbody>
    </table>
    <ModalWindow :show="showModal" @close-window="modalToggler">
      <TaskHandler :taskId="curTaskId" @modalToggler="modalToggler" />
    </ModalWindow>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TaskColumn, Task } from '@/interface/task'
import { useTaskStore } from '@/stores/task'
import { formatDate } from '@/utils/formatDate'
import ModalWindow from '@/components/common/ModalWindow.vue'
import TaskHandler from '@/components/TaskHandler.vue'
import ColumnResizer from '@/components/common/ColumnResizer.vue'

const taskStore = useTaskStore()

const taskFilters = localStorage.getItem('taskFilters')
const taskFiltersData = taskFilters ? JSON.parse(taskFilters) : null

const showModal = ref(false)
const statusFilter = ref<Task['status'] | null>(taskFiltersData?.statusFilter ?? null)
const assigneeFilter = ref<string | null>(taskFiltersData?.assigneeFilter ?? null)
const curTaskId = ref<null | number>(null)
const sortKey = ref<keyof Task | null>(taskFiltersData?.sortKey ?? null)
const sortOrder = ref<'asc' | 'desc'>(taskFiltersData?.sortOrder ?? 'asc')

const columns = ref<TaskColumn[]>([
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'assignee', label: 'Assignee' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'terminalExecution', label: 'Deadline', sortable: true },
  { key: 'action', label: 'Action' },
])

const editTask = (id: number) => {
  curTaskId.value = id
  showModal.value = true
}

const modalToggler = () => {
  showModal.value = false
}

function getTaskStatusOptions(): { value: Task['status'] | null; label: string }[] {
  return [
    { value: 'Completed', label: 'Completed' },
    { value: 'Active', label: 'Active' },
    { value: 'New', label: 'New' },
    { value: 'Blocked', label: 'Blocked' },
    { value: null, label: 'Status' },
  ]
}
const taskStatusOptions = computed(() => getTaskStatusOptions())

const sort = (column: TaskColumn) => {
  if (column.sortable && column.key !== sortKey.value) {
    sortKey.value = column.key as keyof Task
    sortOrder.value = 'asc'
  } else if (column.sortable && column.key === sortKey.value) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }
}

const filterTasks = (arr: Task[]) => {
  return arr.filter((p) => {
    const status = statusFilter.value ? p.status === statusFilter.value : true
    const name = assigneeFilter.value
      ? p.assignee.toLowerCase().includes(assigneeFilter.value.toLowerCase())
      : true
    return status && name
  })
}

const filteredTasks = computed(() => {
  taskStore.setFilters({
    sortOrder: sortOrder.value,
    sortKey: sortKey.value,
    assigneeFilter: assigneeFilter.value,
    statusFilter: statusFilter.value,
  })
  return filterTasks(taskStore.tasks).sort((a, b) => {
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

const deleteTask = (id: number) => {
  taskStore.deleteCurTask(id)
}
</script>

<style scoped lang="scss">
.filter-btn {
  cursor: pointer;
}

.tasks-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.tasks-table th,
.tasks-table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
}
.tasks-table th {
  background-color: #f4f4f4;
}
.status-in-progress {
  color: orange;
}
.status-completed {
  color: green;
}
.status-pending {
  color: gray;
}
</style>
