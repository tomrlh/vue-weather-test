<template>
  <div class="grid container">
    <div class="col-12">
      <Header />

      <NavBar
        v-model="searchQuery"
        :searchData="searchData"
        @fetchCityWeekWeather="fetchCityWeekWeather"
      />

      <div v-if="!loading">
        <div class="grid">
          <div class="col grid-equalHeight">
            <WeatherCard
              :location="location"
              :condition="currentWeather?.condition.text"
              :temperature="currentWeather?.temp_c"
              :icon="currentWeather?.condition.icon"
            />
            <div class="col grid-column-equalHeight">
              <div class="col align-items h-scroll" v-if="weatherForNextHours">
                <TimeForecast
                  v-for="item in weatherForNextHours"
                  :key="item.time"
                  :time="item.time"
                  :icon="item.condition.icon"
                  :temperature="item.temp_c"
                />
              </div>
              <div class="col align-items" v-if="forecastDays && !isMobileView">
                <DayForecast
                  v-for="item in forecastDays"
                  :key="item.date_epoch"
                  :dayForecast="item"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid container" v-if="isMobileView">
          <MobileDayForecast
            v-for="item in forecastDays"
            :key="item.date_epoch"
            :dayForecast="item"
          />
        </div>
      </div>

      <LoaderCircle :loading="loading" v-else />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from '@/components/GlobalHeader.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import TimeForecast from '@/components/TimeForecast.vue'
import DayForecast from '@/components/DayForecast.vue'
import MobileDayForecast from '@/components/MobileDayForecast.vue'
import { cityWeekWeather } from '@/requests/apiClient'
import type { WeatherData, ForecastDay, HourlyForecast, CurrentWeather } from '@/types/WeatherData'
import { getWeatherForNextHours, parseIcon } from '@/utils/utils'
import LoaderCircle from '@/components/LoaderCircle.vue'
import NavBar from '@/components/NavBar.vue'
import { useWindowState } from '@/composables/useWindowState'

const { isMobileView } = useWindowState()

const weatherData = ref<WeatherData | undefined>()
const location = ref<string | undefined>()
const currentWeather = ref<CurrentWeather | undefined>()
const forecastDays = ref<ForecastDay[] | undefined>()
const weatherForNextHours = ref<HourlyForecast[] | undefined>()
const searchQuery = ref('Denver')
const loading = ref(true)

const fetchCityWeekWeather = async () => {
  loading.value = true
  weatherData.value = await cityWeekWeather(searchQuery.value)
  if (weatherData.value) {
    forecastDays.value = weatherData.value.forecast.forecastday
    forecastDays.value = forecastDays.value.slice(1, -1)

    currentWeather.value = weatherData.value.current

    const currentDay = forecastDays.value[0]
    weatherForNextHours.value = getWeatherForNextHours(currentDay.hour)

    location.value = weatherData.value.location.name
  }
  loading.value = false
}

const searchData = (name: string) => {
  searchQuery.value = name
  fetchCityWeekWeather()
}

onMounted(fetchCityWeekWeather)
</script>

<style scoped>
.container {
  padding-left: 5px;
  padding-right: 5px;
}

.align-items {
  display: flex;
  justify-content: space-between;
}

.prefixed-countries {
  display: flex;
  width: 100%;
}

.h-scroll {
  overflow-x: auto;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
