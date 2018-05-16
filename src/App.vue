<template>
  <div id="app">
    <console></console>
  </div>
</template>

<script>
import Console from './components/Console.vue'

export default {
  name: 'app',
  components: {
    Console
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
