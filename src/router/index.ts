import { createRouter, createWebHistory } from 'vue-router'
import ProjectsPage from '../views/ProjectsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'projects',
      component: ProjectsPage,
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('../views/ProjectPage.vue'),
    },
  ],
})

export default router
