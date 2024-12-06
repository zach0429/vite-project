<script setup>
import { ref, onBeforeMount  } from 'vue'
import Swal from 'sweetalert2'

const current_month = new Date().getMonth()
if (parseInt(localStorage.getItem("month")) != current_month) {
  localStorage.setItem("month", current_month)
  localStorage.setItem("total", 3)
} else if (parseInt(localStorage.getItem("total")) == NaN){
  localStorage.setItem("total", 3)
}

const total_items = ref(8)
const minimum_jumps = ref(30) // 超過這數字開始進入抽獎
const month = ref(parseInt(localStorage.getItem('month')))
const total = ref(parseInt(localStorage.getItem('total')))

// const total = ref(0)
let current_index = ref(-1)
let jumps = ref(0)
let speed = ref(30)
let timer = ref(0)
let prize = ref(-1)

const count = ref(0)
const prizes = [
  {key: '🍰'},
  {key: '🍗'},
  {key: '💩'},
  {key: '🏘️'},
  {key: '🎁'},
  {key: '🍰'},
  {key: '💩'},
  {key: '🍗'},
]

const sort_prizes = prizes.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

function runCircle() {
    current_index.value += 1
    if (current_index.value > total_items.value - 1) {
      current_index.value = 0
    }
}

function generatePrizeNumber() {
    return Math.floor(Math.random() * total_items.value)
}

function controllSpeed() {
    if (total.value == 0) {
      return
    } 
    jumps.value += 1
    runCircle()
    // 1. 抽到獎品停止遊戲
    if (jumps.value > minimum_jumps.value + 10 && prize.value === current_index.value) {
        clearTimeout(timer)
        if (sort_prizes[current_index.value].key == '💩') {
          new Swal({
            title: `臭手哈哈 ${sort_prizes[current_index.value].key} !`,
            text: '太衰了吧!',
            imageUrl: "/nothing.jpg"
        })
        } else if (sort_prizes[current_index.value].key == '🍰') {
          new Swal({
            title: `哥買${sort_prizes[current_index.value].key}給你吃`,
            text: '吃甜甜!',
            imageUrl: "/sweet.jpg"
          })
        } else if (sort_prizes[current_index.value].key == '🍗') {
          new Swal({
            title: `Maybe買 ${sort_prizes[current_index.value].key}給你吃~`,
            text: '吃鹹鹹!',
            imageUrl: "/salt2.jpg"
          })
        } else if (sort_prizes[current_index.value].key == '🎁') {
          new Swal({
            title: `沒得吃就補你一個 ${sort_prizes[current_index.value].key}!`,
            text: '小GIFT!',
            imageUrl: "/gift.jpg"
          })
        } else {
          new Swal({
            title: `該出去Play囉 ${sort_prizes[current_index.value].key}!`,
            text: '最大獎ㄟ',
            imageUrl: "/play.jpg"
          })
        }
        let count = parseInt(localStorage.getItem('total'))
        if (count == NaN) count = 3
        localStorage.setItem('total', count - 1)
        total.value -= 1
        prize.value = -1
        jumps.value = 0
        
    // 2. 還沒抽繼續跑
    } else {
      // 還沒進入關鍵抽獎階段前的速度 (前菜轉特效)
      if (jumps.value < minimum_jumps.value) {
        speed.value -= 5 // 加快
      // 決定獎品的位置
      } else if (jumps.value === minimum_jumps.value) {
        const random_number = generatePrizeNumber()
        prize.value = random_number
      } else {
        // 下一個就是獎品時放慢鈍一下
        if ( (jumps.value > minimum_jumps.value + 10) && prize.value === (current_index.value + 1) ) {
          speed.value += 600
        } else {
          speed.value += 20 // 減速
        }
      }
      if (speed.value < 40) speed.value = 40
      timer = setTimeout(controllSpeed, speed.value)
    }
}

function init() {
  jumps.value = 0
  speed.value = 100
  prize.value = -1
  controllSpeed()
}


</script>

<template>
  <h1 class="title">豬穎每月小確幸</h1>
  <section class="container">
    <template v-for="(item, index) in sort_prizes" :key="index">
      <div class="square" :class="{is_active: current_index == index}">
        <div class="square__content">{{ item.key }}</div>
      </div>
    </template>
    <div class="square square__start-btn"
      :class="{prevent: total == 0 }"
      v-on="total != 0 ? {click: init} : {}">
        <div>START</div>
    </div>
    <h3>本月剩餘抽獎次數: {{total}}</h3>
  </section>
</template>

<style styled=scss>
  .title {
      text-align: center;
      margin: 1.2em 0;
      font-size: 2em;
      color: #FBFFFE;
      text-transform: uppercase;
  }
  .prevent {
    pointer-events: none
  }
  .container {
      position: relative;
      display: flex;
      width: 380px;
      margin: 20px auto;
  }

  .square {
      display: flex;
      width: 120px;
      justify-content: center;
      align-items: center;
      height: 120px;
      border: 1px solid lightpink;
      position: absolute;
      background: #EB73B2;
      &.is_active {
          border: 20px solid gold;
      }
  }
  h3 {
    position: absolute;
    color: gold;
    top: 420px;
  }
  .square:nth-child(1) { top: .5rem; left: .0.5rem;}
  .square:nth-child(2) { top: .5rem; left: 8rem;}
  .square:nth-child(3) { top: .5rem; left: 16rem;}
  .square:nth-child(4) { top: 8.5rem; left: 16rem;}
  .square:nth-child(5) { top: 16.5rem; left: 16rem;}
  .square:nth-child(6) { top: 16.5rem; left: 8rem;}
  .square:nth-child(7) { top: 16.5rem; left: .0.5rem;}
  .square:nth-child(8) { top: 8.5rem; left: .0.5rem;}

  .square__content {
      font-size: 2.8em;
  }

  .square__start-btn {
      background: gold;
      color: #e97573;
      font-size: 2em;
      cursor: pointer;
      top: 8.5rem;
      left: 8rem; 
      &:hover {
          background: lighten(gold, 25%);
      }
  }

</style>
