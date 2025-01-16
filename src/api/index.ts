import axios from 'axios'
import type { Project } from '@/interface/project'
import type { Task } from '@/interface/task'

const API_BASE_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const apiErrorHandler = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(`Error: ${error.message}`)
  } else {
    throw new Error(`Error: ${error}`)
  }
}

export const getProjects = async (): Promise<Project[] | undefined> => {
  try {
    const res = await api.get('/projects')
    return res.data
  } catch (err: unknown) {
    apiErrorHandler(err)
  }
}
export const getProjectById = async (id: number): Promise<Project | undefined> => {
  try {
    const res = await api.get(`/projects/${id}`)
    return res.data
  } catch (err: unknown) {
    apiErrorHandler(err)
  }
}

export const addProject = async (project: Partial<Project>) => {
  try {
    return await api.post('/projects', project)
  } catch (err: unknown) {
    apiErrorHandler(err)
  }
}

export const updateProject = async (id: number, project: Partial<Project>) => {
  try {
    return await api.put(`/projects/${id}`, project)
  } catch (err: unknown) {
    apiErrorHandler(err)
  }
}

export const deleteProject = async (id: number) => {
  try {
    return await api.delete(`/projects/${id}`)
  } catch (err: unknown) {
    apiErrorHandler(err)
  }
}

export const getTasksWithinProject = async (projectId: number): Promise<Task[] | undefined> => {
  try {
    const res = await api.get(`/tasks?projectId=${projectId}`)
    return res.data
  } catch (err: unknown) {
    apiErrorHandler(err)
  }
}

export const getTaskById = async (id: number): Promise<Task | undefined> => {
  try {
    const res = await api.get(`/tasks/${id}`)
    return res.data
  } catch (err: unknown) {
    apiErrorHandler(err)
  }
}

export const deleteTask = async (id: number) => {
  try {
    return await api.delete(`/tasks/${id}`)
  } catch (err: unknown) {
    apiErrorHandler(err)
  }
}

export const addTask = async (task: Partial<Task>) => {
  try {
    return await api.post('/tasks', task)
  } catch (err: unknown) {
    apiErrorHandler(err)
  }
}

export const updateTask = async (id: number, task: Partial<Task>) => {
  try {
    return await api.put(`/tasks/${id}`, task)
  } catch (err: unknown) {
    apiErrorHandler(err)
  }
}
