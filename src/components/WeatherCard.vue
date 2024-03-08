<template>
  <div class="weather-card">
    <div class="weather-icon">
      <img :src="weatherIcon" alt="Weather Icon" />
    </div>
    <div class="weather-info">
      <h1 class="city-name">{{ cityName }}</h1>
      <p class="weather-description">{{ weatherDescription }}</p>
      <p class="temperature">{{ temperature }}°C</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  cityName: String,
  weatherDescription: String,
  temperature: Number,
  weatherIcon: String
})
</script>

<style scoped>
.weather-card {
  background-color: #c3e0fb;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
}

.weather-icon {
  background-color: white;
  border-radius: 50%;
  padding: 10px;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
}

.weather-info .city-name {
  margin: 0;
  font-weight: bold;
}

.weather-info .weather-description {
  margin: 0;
  color: #555;
}

.weather-info .temperature {
  font-size: 2em;
  margin: 10px 0;
}
</style>
