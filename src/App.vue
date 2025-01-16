<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavPanel from '@/components/NavPanel.vue'
</script>

<template>
  <NavPanel />
  <RouterView />
</template>

<style lang="scss">
#app {
  padding: 0 50px 20px;
}

body {
  background: #e7e7e77d;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  color: #223818;
}

button {
  color: inherit;
  border: none;
  background: none;
}

input,
select {
  padding: 5px;
  border: 1px solid #000;
  border-radius: 5px;
}

.btn {
  display: block;
  border: 2px solid #741507;
  min-width: 60px;
  color: #741507;
  border-radius: 5px;
  height: 30px;
  cursor: pointer;
  transition: all 0.25s;

  &--main {
    font-weight: bold;
    letter-spacing: 0.1rem;
  }

  &:hover,
  &:active {
    color: #fff;
    background: #741507;
  }
}

.cell {
  position: relative;
}
.resizer {
  width: 5px;
  height: 100%;
  cursor: col-resize;
  position: absolute;
  top: 0;
  right: -2px;
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.top-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  &__title {
    font-weight: bold;
    text-decoration: underline;
    color: #741507;
  }
}

.form {
  position: relative;
  height: 100%;

  &__title {
    margin-bottom: 20px;
    color: #741507;
    font-weight: bold;
  }
  &__group {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 0 10px;

    &--action {
      position: absolute;
      bottom: 0;
      justify-content: right;
      gap: 10px;
    }
  }
}

.table {
  width: 100%;
  border-collapse: collapse;

  &__actions {
    display: flex;
    gap: 5px;
  }

  &__row {
    &--link {
      cursor: pointer;

      &:hover {
        background: #dae1c6;
      }
    }
  }
}
</style>
