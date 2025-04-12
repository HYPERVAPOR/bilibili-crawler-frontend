<template>
  <AppNavbar />
  <router-view v-slot="{ Component }">
    <keep-alive include="HomePage">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <PageFooter />
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import PageFooter from './components/PageFooter.vue';
export default {
  components: {
    AppNavbar,
    PageFooter
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
