<template>
  <div class="col container" :style="{ backgroundColor: bgColor }">
    <div>
      <img
        class="weather-icon"
        :src="icon"
        alt="Weather Icon"
        :style="{ backgroundColor: darkenColor(bgColor) }"
      />
      <p class="city-name">{{ location }}</p>
      <p class="weather-description">{{ condition }}</p>
    </div>
    <p class="temperature">{{ temperature }}°C</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { getTemperatureColor, darkenColor } from '@/utils/utils'

const props = defineProps({
  location: String,
  condition: String,
  temperature: Number,
  icon: String
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
}

.weather-icon {
  border-radius: 50%;
  padding: 10px;
  width: 80px;
  margin: 0 auto;
}

.city-name {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 0px;
}

.weather-description {
  margin-top: 0px;
}

.temperature {
  font-size: 4.5em;
  margin: 10px 0;
  font-weight: bold;
}
</style>
