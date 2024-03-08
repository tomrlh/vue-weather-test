<template>
  <div class="col container">
    <div class="weather-time">{{ formattedTime }}</div>
    <div class="weather-icon" :style="{ backgroundColor: bgColor }">
      <img :src="icon" alt="Weather Icon" />
    </div>
    <div class="weather-temp">{{ temperature }}°C</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatTime, getTemperatureColor } from '@/utils/utils'

const props = defineProps({
  time: String,
  icon: String,
  temperature: Number
})

const formattedTime = computed(() => {
  return props.time ? formatTime(props.time) : ''
})

const bgColor = computed(() => {
  return props.temperature ? getTemperatureColor(props.temperature) : ''
})
</script>

<style scoped>
.container {
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.weather-time {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #555;
}

.weather-icon {
  display: inline-block;
  background-color: #e0f2ff;
  border-radius: 50%;
  padding: 20px;
  margin-bottom: 10px;
}

.weather-temp {
  font-size: 24px;
  font-weight: bold;
}
</style>
