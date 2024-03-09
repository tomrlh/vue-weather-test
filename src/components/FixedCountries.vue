<template>
  <span :class="containerCSS" @click="handleActive">
    <p :class="[{ city: !isActive }, { 'city-isA': isActive }]">{{ title }} {{ icon }}</p>
  </span>
  <br />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: String,
  icon: String,
  selectedValue: String,
  onActiveChange: Function
})

const handleActive = () => {
  if (props.onActiveChange && props.title) {
    props.onActiveChange(props.title)
  }
}

const isActive = computed(() => {
  return props.selectedValue == props.title
})

const containerCSS = computed(() => {
  return {
    container: true,
    city: !isActive.value,
    'city-active': isActive.value
  }
})
</script>

<style scoped>
.container {
  display: flex;
  width: auto;
  margin-right: 5px;
  height: 20px;
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
