<template>
  <Headers v-if="$route.meta.showHeader" />
  <router-view />
</template>
<script>
import Headers from "./components/Headers.vue";
export default {
  name: "App",
  components: {
    Headers,
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
