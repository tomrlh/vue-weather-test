<template>
  <div class="grid">
    <div class="col-10" data-push-left="off-1">
      <Header />

      <FixedCountries title="Denver" />

      <div class="grid">
        <div class="col grid-equalHeight">
          <div class="col-3" :style="{ border: '1px solid black' }">
            <WeatherCard
              cityName="Denver"
              weatherDescription="Snowing"
              :temperature="2"
              weatherIcon="path-to-snow-icon.png"
            />
          </div>
          <div class="col grid-column-equalHeight">
            <div
              class="col"
              :style="{
                border: '1px solid black',
                display: 'flex'
              }"
            >
              <TimeForecast /><TimeForecast /><TimeForecast /><TimeForecast /><TimeForecast />
            </div>
            <div
              class="col"
              :style="{
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'space-between'
              }"
              v-if="forecastDays"
            >
              <template v-for="item in forecastDays" :key="item.date_epoch">
                <DayForecast
                  :date="item.date"
                  :icon="item.day.condition.icon"
                  :condition="item.day.condition.text"
                  :temperature="item.day.maxtemp_c"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from '@/components/GlobalHeader.vue'
import FixedCountries from '@/components/FixedCountries.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import TimeForecast from '@/components/TimeForecast.vue'
import DayForecast from '@/components/DayForecast.vue'
import { cityWeekWeather } from '@/requests/apiClient'
import type { WeatherData, ForecastDay } from '@/types/WeatherData'

const weatherData = ref<WeatherData | undefined>()
const forecastDays = ref<ForecastDay[] | undefined>()

const fetchCityWeekWeather = async () => {
  weatherData.value = await cityWeekWeather('Denver')
  if (weatherData.value) {
    forecastDays.value = weatherData.value.forecast.forecastday
    forecastDays.value = forecastDays.value.slice(1, -1)
  }
}

const show = () => {
  if (weatherData.value) {
    console.log(weatherData.value)
  }
  if (forecastDays.value) {
    console.log(forecastDays.value)
  }
}

onMounted(fetchCityWeekWeather)
</script>

<style scoped></style>
