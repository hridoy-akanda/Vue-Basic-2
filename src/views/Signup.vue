<template>
  <div class="signIn">
    <img src="../assets/image.png" alt="logo" />
    <form>
      <input type="text" v-model="username" placeholder="username" />
      <span v-if="v$.username.$error">
        {{ v$.username.$errors[0].$message }}
      </span>
      <input type="email" v-model="email" placeholder="email" />
      <span v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
        {{ exist }}
      </span>
      <input
        type="password"
        v-model="password.password"
        placeholder="password"
      />
      <span v-if="v$.password.password.$error">
        {{ v$.password.password.$errors[0].$message }}
      </span>
      <input
        type="password"
        v-model="password.confirm"
        placeholder="confirm password"
      />
      <span v-if="v$.password.confirm.$error">
        {{ v$.password.confirm.$errors[0].$message }}
      </span>
      <input type="submit" @click.prevent="handleSignup" value="Signup" />
    </form>
    <p>
      Already have an account?
      <router-link to="/login">SignIn</router-link> instead
    </p>
  </div>
</template>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email, sameAs, minLength } from "@vuelidate/validators";

export default {
  name: "Signup",
  data() {
    return {
      v$: useValidate(),
      username: "",
      email: "",
      password: {
        password: "",
        confirm: "",
      },
      exist: null,
    };
  },
  validations() {
    return {
      username: { required },
      email: { required, email },
      password: {
        password: { required, minLength: minLength(6) },
        confirm: { required, sameAs: sameAs(this.password.password) },
      },
    };
  },
  methods: {
    async handleSignup() {
      this.v$.$validate();
      if (!this.v$.$error) {
       
        let result = await axios.post("http://localhost:3000/users", {
          username: this.username,
          email: this.email,
          password: this.password.password,
        });
        if (result.status == 201) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.$router.push({ name: "Home" });
        }
      } else {
        this.exist = "Email already exists";
        
      }
      
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
.signIn img {
  width: 100px;
  margin-top: 30px;
}
.signIn form input {
  display: block;
  margin: auto;
  margin-top: 20px;
  padding: 10px;
  padding-left: 20px;
  border: 1px solid skyblue;
  min-width: 300px;
  max-width: 90%;
  font-size: 1.3rem;
}
.signIn form input[type="submit"] {
  background-color: skyblue;
  border-radius: 5px;
}
.signIn form span {
  color: red;
}
</style>
