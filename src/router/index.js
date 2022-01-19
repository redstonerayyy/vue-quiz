import Vue from "vue";
import VueRouter from "vue-router";

import Question from "../views/Question.vue";
import Profile from "../views/Profile.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Question
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/about",
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
