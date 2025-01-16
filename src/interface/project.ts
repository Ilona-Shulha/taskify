export interface Project {
  id: number
  name: string
  description: string
  tasksCount: number
  status: 'Completed' | 'Active' | 'New'
  createdAt: Date
}

export interface Column {
  key: keyof Project | 'action'
  label: string
  sortable?: boolean
}
