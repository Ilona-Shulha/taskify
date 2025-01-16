export interface Task {
  id: number
  projectId: number
  title: string
  assignee: string
  status: 'Completed' | 'Active' | 'New' | 'Blocked'
  terminalExecution: string | number | Date
}

export interface TaskColumn {
  key: keyof Task | 'action'
  label: string
  sortable?: boolean
}

export interface TaskFilters {
  sortOrder?: 'asc' | 'desc'
  sortKey?: keyof Task | null
  assigneeFilter?: string | null
  statusFilter?: Task['status'] | null
}
