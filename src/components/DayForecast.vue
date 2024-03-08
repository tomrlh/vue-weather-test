<template>
  <div class="col container" :style="{ backgroundColor: bgColor }">
    <div class="weather-icon">
      <img :src="icon" alt="Weather Icon" />
    </div>
    <div class="weather-info">
      <div class="weather-day-condition">
        <p class="weather-day">{{ dayName }}</p>
        <p class="weather-condition">{{ condition }}</p>
      </div>
      <div class="weather-temperature">{{ temperature }}°C</div>
    </div>
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
  border-radius: 20px;
  padding: 20px;
  width: 144px;
  margin-right: 10px;
  text-align: center;
  max-width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.weather-icon {
}

.weather-icon img {
  width: 50px; /* Adjust the size as needed */
}

.weather-info {
  font-family: 'Arial', sans-serif;
}

.weather-day-condition {
  margin-bottom: 8px;
}

.weather-day {
  font-size: 18px;
  font-weight: bold;
}

.weather-condition {
  font-size: 1em;
  color: #607d8b;
}

.weather-temperature {
  font-size: 2em;
  font-weight: bold;
}
</style>

<!-- (forecast.forecastday[0].condition.icon)
 (forecast.forecastday[0].condition.text)
 (forecast.forecastday[0].maxtemp_c) -->
