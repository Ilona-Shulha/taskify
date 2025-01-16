import { ref, computed } from 'vue'
import type { Project } from '@/interface/project'
import { useProjectStore } from '@/stores/project'
import { useDebounce } from '@/composables/useDebounce'

export const useProjectForm = () => {
  const projectStore = useProjectStore()

  const project = ref<Partial<Project>>({
    name: '',
    description: '',
    status: 'New' as Project['status'],
  })

  const setName = useDebounce((e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target.value) return
    project.value.name = target.value
  }, 500)

  const setDescription = useDebounce((e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target.value) return
    project.value.description = target.value
  }, 500)

  const setStatus = (e: Event) => {
    const target = e.target as HTMLSelectElement
    const value = target.value as Project['status']
    if (!target.value) return
    project.value.status = value
  }

  const saveProject = async () => {
    await projectStore.addNewProject(project.value)
  }
  const editProject = async () => {
    await projectStore.editCurProject(project.value)
  }

  function getProjectStatusOptions(): { value: Project['status']; label: string }[] {
    return [
      { value: 'Completed', label: 'Completed' },
      { value: 'Active', label: 'Active' },
      { value: 'New', label: 'New' },
    ]
  }

  const projectStatusOptions = computed(() => getProjectStatusOptions())

  return {
    project,
    setName,
    setStatus,
    saveProject,
    editProject,
    setDescription,
    projectStatusOptions,
  }
}
