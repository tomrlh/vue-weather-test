<template>
  <div class="col container" :style="{ backgroundColor: bgColor }">
    <div class="weather-information">
      <img class="weather-icon" :src="dayForecast.day.condition.icon" alt="Weather Icon" />
      <div class="weather-info">
        <div class="weather-day">{{ dayName }}</div>
        <div class="weather-condition">{{ dayForecast.day.condition.text }}</div>
      </div>
    </div>
    <div class="weather-temperature">{{ dayForecast.day.avgtemp_c }}°C</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { checkDate, getTemperatureColor } from '@/utils/utils'
import type { ForecastDay } from '@/types/WeatherData'

const props = defineProps({
  dayForecast: {
    type: Object as () => ForecastDay,
    required: true
  }
})

const dayName = computed(() => checkDate(props.dayForecast.date))
const bgColor = computed(() => getTemperatureColor(props.dayForecast.day.avgtemp_c))
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  padding: 20px;
  height: 200px !important;
  margin-right: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

img {
  width: 100px !important;
  align-self: center;
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
