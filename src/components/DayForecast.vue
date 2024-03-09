<template>
  <div class="col container" :style="{ backgroundColor: bgColor }">
    <div class="weather-information">
      <img class="weather-icon" :src="icon" alt="Weather Icon" />
      <div class="weather-info">
        <div class="weather-day">{{ dayName }}</div>
        <div class="weather-condition">{{ condition }}</div>
      </div>
    </div>
    <div class="weather-temperature">{{ temperature }}°C</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { checkDate, getTemperatureColor } from '@/utils/utils'

const props = defineProps({
  date: String,
  icon: String,
  condition: String,
  temperature: Number
})

const dayName = computed(() => {
  return props.date ? checkDate(props.date) : ''
})

const bgColor = computed(() => {
  return props.temperature ? getTemperatureColor(props.temperature) : ''
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  padding: 20px;
  width: 110px;
  height: 200px !important;
  margin-right: 10px;
  text-align: center;
  max-width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.weather-icon img {
  width: 50px;
}

.weather-information {
  display: flex;
  flex-direction: column;
  margin-top: -10px;
}

.weather-info {
  font-family: 'Inter', 'Arial', sans-serif;
}

.weather-day-condition {
  margin-bottom: 8px;
}

.weather-day {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0;
}

.weather-condition {
  font-size: 14px;
  color: #607d8b;
  margin-top: 0;
}

.weather-temperature {
  display: flex;
  justify-content: flex-end;
  align-self: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: -10px;
}
</style>
