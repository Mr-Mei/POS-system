import Vue from "vue";
import VueRouter from "vue-router";
import Pos from "@/views/Pos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Pos",
    component: Pos
  },
  {
    path: "/shop",
    name: "Shop",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Shop.vue")
  }
];

const router = new VueRouter({
  linkExactActiveClass: "active",
  routes
});

export default router;
