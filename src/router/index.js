// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/HomePage.vue"; // 确保你有这个组件
import Quickstart from "@/components/QuickstartPage.vue";

// 路由配置
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/quickstart",
    name: "Quickstart",
    component: Quickstart,
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导出路由实例
export default router;
