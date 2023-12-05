<template>
  <div id="app">
    <div class="container mt-4" style="height: 100%;">
      <h2 class="font-weight-bold d-flex m-3">Anotações</h2>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
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
