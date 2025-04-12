// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 导入路由实例
import "./assets/styles.css";

// 创建 Vue 应用并使用路由
createApp(App)
  .use(router) // 使用 router
  .mount("#app");
