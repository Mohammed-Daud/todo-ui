<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <to-do-list></to-do-list>
  </div>
</template>

<script>
import ToDoList from './components/ToDoList'

export default {
  name: 'App',
  components: { ToDoList },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 400px;
  width:100%;
  margin: auto;
  margin-top: 60px;
  text-align: center;
}
#app img {
  width: 50px;
}
</style>
