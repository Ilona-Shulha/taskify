import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Task, TaskFilters } from '@/interface/task'
import { getTasksWithinProject, deleteTask, addTask, updateTask, getTaskById } from '@/api/index'

export const useTaskStore = defineStore('tasks', () => {
  const tasksLoading = ref(false)
  const taskEditingLoading = ref(false)

  const tasks = ref<Task[]>([])
  const filters = ref<TaskFilters | null>(null)
  const task = ref<Task | null>(null)
  const curProjectId = ref<number | null>(null)

  const tasksInLocalStore = localStorage.getItem('tasks')
  const taskInLocalStore = localStorage.getItem('task')

  watch(
    () => tasks,
    (state) => {
      localStorage.setItem('tasks', JSON.stringify(state.value))
    },
    { deep: true },
  )
  watch(
    () => task,
    (state) => {
      localStorage.setItem('task', JSON.stringify(state.value))
    },
    { deep: true },
  )
  watch(
    () => filters,
    (state) => {
      localStorage.setItem('taskFilters', JSON.stringify(state.value))
    },
    { deep: true },
  )

  const setCurProjectId = (id: number) => {
    curProjectId.value = id
  }
  const setFilters = (data: TaskFilters) => {
    filters.value = data
  }

  const getTasksListByProjectId = async (id: number) => {
    try {
      tasksLoading.value = true
      const projectsList = await getTasksWithinProject(id)
      if (projectsList) {
        tasks.value = projectsList
      }
    } catch (err) {
      console.log(err)
    } finally {
      tasksLoading.value = false
    }
  }

  const deleteCurTask = async (id: number) => {
    try {
      const res = await deleteTask(id)
      if (res?.status === 200 && curProjectId.value) {
        getTasksListByProjectId(curProjectId.value)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const addNewTask = async (newTask: Partial<Task>) => {
    try {
      if (!curProjectId.value) return
      taskEditingLoading.value = true
      const res = await addTask({ ...newTask, projectId: curProjectId.value })
      if (res?.status === 201 && curProjectId.value) {
        getTasksListByProjectId(curProjectId.value)
      }
    } catch (err) {
      console.log(err)
    } finally {
      taskEditingLoading.value = false
    }
  }
  const editCurTask = async (newTask: Partial<Task>) => {
    try {
      taskEditingLoading.value = true
      if (!newTask.id) return
      const res = await updateTask(newTask.id, newTask)
      if (res?.status === 200 && curProjectId.value) {
        getTasksListByProjectId(curProjectId.value)
      }
    } catch (err) {
      console.log(err)
    } finally {
      taskEditingLoading.value = false
    }
  }

  const getCurrentTask = async (id: number) => {
    try {
      taskEditingLoading.value = true
      const currentProject = await getTaskById(id)
      if (currentProject) {
        task.value = currentProject
      }
    } catch (err) {
      console.log(err)
    } finally {
      taskEditingLoading.value = false
    }
  }

  if (taskInLocalStore) {
    task.value = JSON.parse(taskInLocalStore)
  }
  if (tasksInLocalStore) {
    tasks.value = JSON.parse(tasksInLocalStore)
  }

  return {
    tasks,
    task,
    getTasksListByProjectId,
    setCurProjectId,
    getCurrentTask,
    deleteCurTask,
    addNewTask,
    editCurTask,
    setFilters,
  }
})
