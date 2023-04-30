<template>
  <div class="home">Hello {{ username }}! Welcome to the Home page</div>
  <table>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Contact</th>
      <th>Address</th>
      <th>Action</th>
    </tr>
    <tr v-for="item in restaurants" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.contact }}</td>
      <td>{{ item.address }}</td>
      <td>
        <router-link :to="'/update/' + item.id">Update</router-link
        ><br /><button @click="deleteItem(item.id)">Delete</button>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      username: "",
      restaurants: [],
    };
  },
  methods: {
    async deleteItem(id) {
      let res = await axios.delete("http://localhost:3000/restaurants/" + id);
      
      if (res.status == 200) {
        let result = await axios.get("http://localhost:3000/restaurants");
        this.restaurants = result.data;
      }
    },
  },
  async mounted() {
    let info = localStorage.getItem("user-info");
    if (!info) {
      this.$router.push({ name: "Login" });
    } else {
      this.username = JSON.parse(info).username;
      let result = await axios.get("http://localhost:3000/restaurants");
      this.restaurants = result.data;
    }
  },
};
</script>

<style>
.home {
  margin: 30px auto;
}
table,
td,
th {
  border: 1px solid chocolate;
}
table {
  margin: 50px auto;
}
td,
th {
  width: 200px;
  height: 50px;
}
</style>
