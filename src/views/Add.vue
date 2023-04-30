<template>
  <p>Add restaurant</p>
  <div class="add">
    <form>
      <input type="text" v-model="name" placeholder="name" />
      <span v-if="v$.name.$error">
        {{ v$.name.$errors[0].$message }}
      </span>
      <input type="text" v-model="contact" placeholder="contact" />
      <span v-if="v$.contact.$error">
        {{ v$.contact.$errors[0].$message }}
      </span>
      <input type="text" v-model="address" placeholder="address" />
      <span v-if="v$.address.$error">
        {{ v$.address.$errors[0].$message }}
      </span>
      <input @click.prevent="handleSubmit" type="submit" value="Add" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "Add",
  data() {
    return {
      v$: useValidate(),
      name: "",
      contact: "",
      address: "",
    };
  },
  validations() {
    return {
      name: { required },
      contact: { required },
      address: { required },
    };
  },
  methods: {
    async handleSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/restaurants", {
          name: this.name,
          contact: this.contact,
          address: this.address,
        });
        console.log(result);
        if (result.status === 201) {
          this.$router.push({ name: "Home" });
        }
      }
    },
  },
  mounted() {
    let info = localStorage.getItem("user-info");
    if (!info) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style>
p {
  margin-top: 20px;
}
.add form input {
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
.add form input[type="submit"] {
  background-color: skyblue;
  border-radius: 5px;
}
.add form span {
  color: red;
}
</style>
