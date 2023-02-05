import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Cart from "../pages/Cart.vue";
import Login from "../pages/Login.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import UserLayout from "../components/UserLayout.vue";
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
        path: "/cart",
        name: "cart",
        component: Cart,
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
