<template>
  <div
    :class="['container', { 'col-12': isMobileView }, { col: !isMobileView }]"
    :style="{ backgroundColor: bgColor }"
  >
    <div class="weather-information">
      <img class="weather-icon" :src="icon" alt="Weather Icon" />
      <div class="weather-info">
        <div class="weather-day">{{ dayName }}</div>
        <div class="weather-condition">{{ condition }}</div>
      </div>
    </div>

    <div class="temperature-container">
      <p class="temperature">{{ temperature }}°C</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { checkDate, getTemperatureColor } from '@/utils/utils'
import { useWindowState } from '@/composables/useWindowState'

const { isMobileView } = useWindowState()

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
  flex-direction: row;
  justify-content: space-between;
  border-radius: 20px;
  padding: 20px;
  height: 100px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.weather-icon img {
  width: 50px;
}

.weather-information {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.weather-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
  font-family: 'Inter', 'Arial', sans-serif;
}

.weather-day {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.weather-condition {
  font-size: 14px;
  color: #607d8b;
  margin: 0;
}

.weather-temperature {
  display: flex;
  justify-content: center;
  align-self: center;
  font-size: 22px;
  font-weight: bold;
}

.temperature-container {
  display: flex;
}

.temperature {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 1.5em;
  margin: 15px 0;
}
</style>
