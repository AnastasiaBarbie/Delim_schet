import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "PeopleList",
    path: "/",
    component: () => import("../components/PeopleList.vue"),
  },
  {
    name: "OrderItems",
    path: "/OrderItems",
    component: () => import("../components/OrderItems.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
