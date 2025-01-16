import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Project } from '@/interface/project'
import { getProjects, addProject, getProjectById, updateProject, deleteProject } from '@/api/index'

export const useProjectStore = defineStore('projects', () => {
  const projectsLoading = ref(false)
  const projectEditingLoading = ref(false)
  const currentProjectLoading = ref(false)

  const projects = ref<Project[]>([])
  const project = ref<Project | null>(null)

  const getProjectsList = async () => {
    try {
      projectsLoading.value = true
      const projectsList = await getProjects()
      if (projectsList) {
        projects.value = projectsList
      }
    } catch (err) {
      console.log(err)
    } finally {
      projectsLoading.value = false
    }
  }

  const getCurrentProject = async (id: number) => {
    try {
      currentProjectLoading.value = true
      const currentProject = await getProjectById(id)
      if (currentProject) {
        project.value = currentProject
      }
    } catch (err) {
      console.log(err)
    } finally {
      currentProjectLoading.value = false
    }
  }

  const addNewProject = async (newProject: Partial<Project>) => {
    try {
      projectEditingLoading.value = true
      const res = await addProject(newProject)
      if (res?.status === 201) {
        getProjectsList()
      }
    } catch (err) {
      console.log(err)
    } finally {
      projectEditingLoading.value = false
    }
  }
  const editCurProject = async (newProject: Partial<Project>) => {
    try {
      projectEditingLoading.value = true
      if (!newProject.id) return
      const res = await updateProject(newProject.id, newProject)
      if (res?.status === 200) {
        getProjectsList()
      }
    } catch (err) {
      console.log(err)
    } finally {
      projectEditingLoading.value = false
    }
  }
  const deleteCurProject = async (id: number) => {
    try {
      const res = await deleteProject(id)
      if (res?.status === 200) {
        getProjectsList()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return {
    projects,
    project,
    projectsLoading,
    getProjectsList,
    getCurrentProject,
    addNewProject,
    editCurProject,
    deleteCurProject,
  }
})
