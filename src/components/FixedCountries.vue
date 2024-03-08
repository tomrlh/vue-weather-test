<template>
  <span class="container" @click="handleActive">
    <p :class="[{ city: !active }, { 'city-active': active }]">{{ title }} 🏔</p>
  </span>
  <br />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)

const props = defineProps({
  title: String,
  count: Number
})

const handleActive = () => {
  active.value = !active.value
}
</script>

<style scoped>
.container {
  display: flex;
}

.city {
  align-items: center;
  font-weight: bold;
  padding: 8px 24px 8px 24px;
  border-radius: 10px;
  gap: 10px;
  cursor: pointer;
}
.city:hover {
  background-color: #a4d3ee;
  cursor: pointer;
}

.city-active {
  background: #c3e0fb;
  align-items: center;
  font-weight: bold;
  padding: 8px 24px 8px 24px;
  border-radius: 10px;
  gap: 10px;
  cursor: pointer;
}
.city-active:hover {
  background-color: #a4d3ee;
  cursor: pointer;
}
</style>
