<script setup>
  import { RouterView, RouterLink } from "vue-router"
  import HelloWorld from "./components/HelloWorld.vue"
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <nav>
    <RouterLink to="/">HomePage </RouterLink>
    <RouterLink to="/Login2">Special Page</RouterLink>
  </nav>
  <RouterView />
</template>

<style lang="scss">
  
</style>
