<template>
  <div class="chart-container">
    <Bar v-if="tasks" :data="chartData" :options="chartOptions" />
    <div v-else>Loader</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import type { Task } from '@/interface/task'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<{
  tasks: Task[]
}>()

const chartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: 'Tasks by Status',
      data: [] as number[],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      borderWidth: 1,
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => {
          return `${tooltipItem.label}: ${tooltipItem.raw} tasks`
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
        beginAtZero: true,
        callback: (value: number) => Math.floor(value),
      },
    },
  },
})

watch(
  () => props.tasks,
  () => {
    if (!props?.tasks) return
    const taskStatusCounts = props?.tasks?.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    chartData.value = {
      labels: Object.keys(taskStatusCounts),
      datasets: [
        {
          label: 'Tasks by Status',
          data: Object.values(taskStatusCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          borderWidth: 1,
        },
      ],
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.chart-container {
  max-width: 80%;
  width: 500px;
  max-height: 250px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
