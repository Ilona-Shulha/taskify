import { ref, computed } from 'vue'
import type { Task } from '@/interface/task'
import { useTaskStore } from '@/stores/task'
import { useDebounce } from '@/composables/useDebounce'

export const useTaskForm = () => {
  const taskStore = useTaskStore()

  const task = ref<Partial<Task>>({
    title: '',
    assignee: '',
    status: 'New' as Task['status'],
    terminalExecution: new Date(),
  })

  const setTitle = useDebounce((e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target.value) return
    task.value.title = target.value
  }, 500)

  const setDeadline = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target.value) return
    task.value.terminalExecution = target.value
  }

  const setAssignee = useDebounce((e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target.value) return
    task.value.assignee = target.value
  }, 500)

  const setStatus = (e: Event) => {
    const target = e.target as HTMLSelectElement
    const value = target.value as Task['status']
    if (!target.value) return
    task.value.status = value
  }

  const saveTask = async () => {
    await taskStore.addNewTask(task.value)
  }
  const editTask = async () => {
    await taskStore.editCurTask(task.value)
  }

  function getTaskStatusOptions(): { value: Task['status']; label: string }[] {
    return [
      { value: 'Completed', label: 'Completed' },
      { value: 'Active', label: 'Active' },
      { value: 'New', label: 'New' },
      { value: 'Blocked', label: 'Blocked' },
    ]
  }

  const taskStatusOptions = computed(() => getTaskStatusOptions())

  return {
    task,
    setTitle,
    setStatus,
    saveTask,
    editTask,
    setAssignee,
    taskStatusOptions,
    setDeadline,
  }
}
