<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <div class="bb">
    <p>123</p>
  </div>
</template>

<style lang="scss">
  .bb {
    height: 50px;
    width: 50px;
    background-color: blue;
    p {
      color: yellow;
    }
  }
</style>
