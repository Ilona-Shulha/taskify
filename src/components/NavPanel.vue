<template>
  <nav class="nav">
    <p>TASKIFY</p>
    <router-link to="/">Projects</router-link>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;

  &::after {
    content: '';
    position: absolute;
    display: block;
    height: 1px;
    width: 100%;
    background: #00000082;
    left: 0;
    top: 70px;
  }
}

nav a,
nav button {
  text-decoration: none;
  font-weight: bold;
  color: #8b0000;
}

nav a.router-link-exact-active {
  color: #ff0000;
}
</style>
