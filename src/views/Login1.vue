<script setup>
  import { ref } from 'vue'

  const items = ref([
    {name: "A", seleted: false},
    {name: "B", seleted: false},
    {name: "C", seleted: false},
    {name: "E", seleted: false},
    {name: "F", seleted: false},
    {name: "G", seleted: false},
    {name: "H", seleted: false},
  ])


  const click_fun = (name) => {
    const idx = items.value.findIndex(val => val.name === name)
    items.value[idx].seleted = true
}

</script>

<template>
  <template v-for="(item, index) in items" :key="index">
    <div class="bb" @click="click_fun(item.name)" :class="{ selected: item.seleted }">
    {{ item.name }}
    </div>
  </template>
</template>

<style lang="scss">
.bb {
    height: 50px;
    width: 50px;
    border: solid 1px;
    display: inline-block;
    background-color: green;
  }
  .selected {
    background-color: grey;
  }
</style>