<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/add">Add Restaurant</router-link>
    <router-link to="/login" @click="logout" v-if="loggedIn"
      >Logout</router-link
    >
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      loggedIn: null,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.loggedIn = false;
    },
  },
  mounted() {
    this.loggedIn = localStorage.getItem("user-info");
  },
};
</script>

<style>
nav {
  background-color: black;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}
nav a {
  color: white;
  margin: 15px;
  text-decoration: none;
  font-size: 1.2rem;
}
nav a:hover {
  color: chocolate;
}
</style>
