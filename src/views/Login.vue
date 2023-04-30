<template>
  <div class="signIn">
    <img src="../assets/image.png" alt="logo" />
    <form>
      <input
        type="email"
        ref="emails"
        v-model="email"
        placeholder="email"
        @click="hanldeChangeEmail"
      />
      <input
        type="password"
        v-model="password"
        placeholder="password"
        ref="passwords"
        @click="handleChangePassword"
      />
      <input type="submit" @click.prevent="handleLogin" value="Login" />
    </form>
    <p>
      Don't have an account?
      <router-link to="/signup">Signup</router-link> instead
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      );

      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.$router.push({ name: "Home" });
      } else {
        this.$refs.emails.style.color = "red";
        this.$refs.passwords.style.color = "red";
      }
    },
    handleChangePassword() {
      this.$refs.passwords.style.color = "black";
    },
    hanldeChangeEmail() {
      this.$refs.emails.style.color = "black";
    },
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style>
.signIn a {
  text-decoration: none;
}
.signIn p {
  margin-top: 30px;
  font-size: 1.3rem;
}
</style>
