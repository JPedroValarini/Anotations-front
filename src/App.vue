<template>
  <div id="app">
    <CreateNote />
  </div>
</template>

<script>
import CreateNote from './components/CreateNote.vue';

export default {
  name: 'App',
  components: {
    CreateNote
  }
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
