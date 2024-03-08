<template>
  <div :class="[{ 'col-3': !isMobileView }, { 'col-12': isMobileView }]">
    <div
      :class="['weather-container', { 'col-3': !isMobileView }, { 'col-12': isMobileView }]"
      :style="{ backgroundColor: bgColor }"
    >
      <div class="informations">
        <img
          class="weather-icon"
          :src="icon"
          alt="Weather Icon"
          :style="{ backgroundColor: darkenColor(bgColor) }"
        />
        <div class="description-container">
          <p class="city-name">{{ location }}</p>
          <p class="weather-description">{{ condition }}</p>
        </div>
      </div>
      <div class="temperature-container">
        <p class="temperature">{{ temperature }}</p>
        <p class="celsius">°C</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useWindowState } from '@/composables/useWindowState'
import { getTemperatureColor, darkenColor } from '@/utils/utils'

const { isMobileView } = useWindowState()

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
.weather-container {
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.temperature-container {
  display: flex;
}

.informations {
  display: flex;
  flex-direction: column;
}

@media (max-width: 998px) {
  .weather-container {
    flex-direction: row;
  }
  .temperature-container {
    display: flex;
  }
  .informations {
    display: flex;
    flex-direction: row;
  }
}

.description-container {
  margin-left: 15px;
}

@media (min-width: 999px) {
  .weather-container {
    flex-direction: column;
    justify-content: space-between;
  }
  .informations {
    display: flex;
    flex-direction: column;
  }
  .description-container {
    margin-left: 0px;
  }
  .city-name {
    text-align: left;
  }
  .weather-description {
    text-align: left;
  }
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
  text-align: center;
}

.weather-description {
  margin-top: 0px;
  text-align: center;
}

.temperature {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 4.5em;
  margin: 10px 0;
  font-weight: bold;
}

.celsius {
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-top: -20px;
}
</style>
