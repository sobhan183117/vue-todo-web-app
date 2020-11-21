<template>
  <div id="app">
    <Todo />
  </div>
</template>

<script>
//custom import
import Todo from "./components/Todo.vue";

export default {
  name: "app",
  components: {
    Todo,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}
</style>
