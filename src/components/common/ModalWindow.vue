<template>
  <div v-if="show" class="modal-window" @click="$emit('closeWindow')">
    <div class="modal-window__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['show'])
defineEmits(['closeWindow'])
</script>

<style lang="scss">
.modal-window {
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);

  &__content {
    border-radius: 5px;
    box-sizing: border-box;
    background-color: #fff;
    margin: auto;
    padding: 30px;
    width: 80%;
    max-width: 400px;
    max-height: 80%;
    height: 300px;
    text-align: center;

    @media (max-width: 500px) {
      max-width: 350px;
    }
  }
}
</style>
