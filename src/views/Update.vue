<template>
  <p>Update restaurant</p>
  <div class="update">
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
      <input @click.prevent="handleSubmit" type="submit" value="Update" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "Update",
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
        let result = await axios.put(
          "http://localhost:3000/restaurants/" + this.$route.params.id,
          {
            name: this.name,
            contact: this.contact,
            address: this.address,
          }
        );
        console.log(result);
        if (result.status === 200) {
          this.$router.push({ name: "Home" });
        }
      }
    },
  },
  async mounted() {
    let info = localStorage.getItem("user-info");
    if (!info) {
      this.$router.push({ name: "Login" });
    }
    let result = await axios.get(
      "http://localhost:3000/restaurants/" + this.$route.params.id
    );
    this.name = result.data.name;
    this.contact = result.data.contact;
    this.address = result.data.address;
  },
};
</script>

<style>
p {
  margin-top: 20px;
}
.update form input {
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
.update form input[type="submit"] {
  background-color: skyblue;
  border-radius: 5px;
}
.update form span {
  color: red;
}
</style>
