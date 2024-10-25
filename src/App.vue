<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref, computed } from 'vue'


function shuffle(array) {
  let currentIndex = array.length
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }
  return array
}

// Used like so
let arr = [0,1,2,3,5,6,7]
let shuffle_arr = shuffle(arr)

for (let i = 0; i < shuffle_arr.length; i++) {
  setTimeout(() => {
    items.value[shuffle_arr[i]].seleted = true
  }, Math.random()*1000*i);
}

const items = ref([
  {name: "A", seleted: false},
  {name: "B", seleted: false},
  {name: "C", seleted: false},
  {name: "D", seleted: false},
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
  <HelloWorld msg="Vite + Vue" />
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
