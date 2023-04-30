import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Add from "../views/Add.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import PageNotFound from "../views/PageNotFound.vue";
import Update from "../views/Update.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { showHeader: true },
  },
  {
    path: "/add",
    name: "Add",
    component: Add,
    meta: { showHeader: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { showHeader: false },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { showHeader: false },
  },
  {
    path: "/update/:id",
    name: "Update",
    component: Update,
    meta: { showHeader: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: PageNotFound,
    meta: { showHeader: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
