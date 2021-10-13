<template>
  <div class="content">
    <AppTopBar/>
    <div class="page-content">
        <router-view/>
    </div>
  </div>
</template>

<script>
import AppTopBar from './components/AppNavbar.vue'


export default {
  name: 'App',
  components: {
    'AppTopBar': AppTopBar
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
