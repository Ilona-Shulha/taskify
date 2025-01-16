import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

interface Project {
  id: number;
  name: string;
  description: string;
  tasksCount: number;
  status: 'Completed' | 'Active' | 'New';
  createdAt: Date;
}

interface Task {
  id: number;
  projectId: number;
  title: string;
  status: 'Completed' | 'Active' | 'New' | 'Blocked';
  assignee: string;
  terminalExecution: Date;
}

let projects: Project[] = [
  { id: 1, name: 'Project A1', description: 'description Project A1', tasksCount: 3, status: 'Active', createdAt: new Date() },
  { id: 2, name: 'Project B', description: 'description Project B1', tasksCount: 2, status: 'Completed', createdAt: new Date('2023-01-15') },
  { id: 3, name: 'Project C', description: 'description Project C1', tasksCount: 3, status: 'Active', createdAt: new Date('2022-12-31') }
];

let tasks: Task[] = [
  { id: 1, projectId: 1, title: 'Task 1', status: 'Active', assignee: 'Person', terminalExecution: new Date('2022-12-31') },
  { id: 2, projectId: 1, title: 'Task 2', status: 'Completed', assignee: 'Person', terminalExecution: new Date('2023-01-15') },
  { id: 3, projectId: 1, title: 'Task 3', status: 'Blocked', assignee: 'Person', terminalExecution: new Date('2022-12-31') },
  { id: 4, projectId: 2, title: 'Task 4', status: 'Blocked', assignee: 'Person', terminalExecution: new Date('2022-12-31') },
  { id: 5, projectId: 2, title: 'Task 5', status: 'Completed', assignee: 'Person', terminalExecution: new Date('2022-12-31') },
  { id: 6, projectId: 3, title: 'Task 6', status: 'Completed', assignee: 'Person', terminalExecution: new Date('2023-01-15') },
  { id: 7, projectId: 3, title: 'Task 7', status: 'Active', assignee: 'Person', terminalExecution: new Date('2022-12-31') },
  { id: 8, projectId: 3, title: 'Task 8', status: 'Blocked', assignee: 'Person', terminalExecution: new Date('2022-12-31') },
];

const projectTaskCounter = (projectId: number, action: string) => {
  projects.forEach(project => {
    if (project.id !== projectId) return;
    project.tasksCount = action === 'del' ? project.tasksCount - 1 : project.tasksCount + 1
  })
};


app.get('/projects/:id', (req: Request, res: Response) => {
  const project = projects.find(p => p.id === +req.params.id)
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

app.get('/projects', (req: Request, res: Response) => {
  res.json(projects);
});

app.post('/projects', (req: Request, res: Response) => {
  const newProject: Project = {
    id: projects.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put('/projects/:id', (req: Request, res: Response) => {
  const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
  if (projectIndex !== -1) {
    projects[projectIndex] = { ...projects[projectIndex], ...req.body };
    res.json(projects[projectIndex]);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

app.delete('/projects/:id', (req: Request, res: Response) => {
  const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);
    res.status(200).json({ message: 'Project deleted successfully' });
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});


app.get('/tasks', (req: Request, res: Response) => {
  const { projectId } = req.query;

  if (!projectId || typeof projectId !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid project ID' });
  }

  const filteredTasks = tasks.filter(task => task.projectId === +projectId);

  res.json(filteredTasks);
});

app.get('/tasks/:id', (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === +req.params.id)
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.post('/tasks', (req: Request, res: Response) => {
  const newTask: Task = {
    id: tasks.length + 1,
    ...req.body,
    projectId: req.body.projectId
  };
  tasks.push(newTask);
  projectTaskCounter(req.body.projectId, 'add');
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req: Request, res: Response) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req: Request, res: Response) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    projectTaskCounter(tasks[taskIndex].projectId, 'del');
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});