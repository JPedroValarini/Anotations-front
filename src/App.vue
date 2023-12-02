<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #e5e5e5;
}

#app {
  height: 100%;
  background-color: #e5e5e5;
}
</style>
