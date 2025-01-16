<template>
  <div class="resizer" @click.stop @mousedown.stop="startResizing($event, index)"></div>
</template>

<script setup lang="ts">
defineProps<{
  index: number
}>()

const startResizing = (event: MouseEvent, columnIndex: number) => {
  const table = event.target.closest('.table') as HTMLElement
  const header = table.querySelectorAll('th')[columnIndex] as HTMLElement
  const startX = event.pageX
  const startWidth = header.offsetWidth

  const onMouseMove = (moveEvent: MouseEvent) => {
    const delta = moveEvent.pageX - startX
    const newWidth = Math.max(startWidth + delta, 50)
    header.style.width = `${newWidth}px`
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
</script>
