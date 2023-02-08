import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import UserLayout from "../components/UserLayout.vue";
import Cart from "../pages/Cart.vue";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Order from "../pages/Order.vue"
const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      {
        path: "/register",
        name: "register",
        component: Register,
      },
      {
        path: "/cart",
        name: "cart",
        component: Cart,
      },
      {
        path: "/order",
        name: "order",
        component: Order,
      },
      {
        path: "/:notFound(.*)",
        component: null,
      },
    ],
  },
  {
    path: "/user",
    component: UserLayout,
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
