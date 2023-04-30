<template>
  <div class="pageNotFound">
    <h1>Error 404</h1>
    <h3>Page not found</h3>
    <h4>Go back to <router-link to="/">Home</router-link></h4>
  </div>
</template>

<script>
export default {};
</script>

<style>
.pageNotFound h1 {
  margin-top: 50px;
  margin-bottom: 20px;
}
.pageNotFound h3 {
  margin-bottom: 20px;
}
.pageNotFound a {
  text-decoration: none;
  color: green;
  cursor: pointer;
}
</style>
