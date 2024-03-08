<template>
  <div class="grid">
    <div class="col-10" data-push-left="off-1">
      <Header />

      <SearchInput v-model="searchQuery" @input="fetchCityWeekWeather" />

      <div class="grid">
        <div class="col-12 prefixed-countries">
          <template v-for="item in prefixedCountries" :key="item.title">
            <FixedCountries
              :title="item.title"
              :icon="item.icon"
              :onActiveChange="updateLocation"
              :selectedValue="searchQuery"
            />
          </template>
        </div>
      </div>

      <div class="grid" v-if="!loading">
        <div class="col grid-equalHeight">
          <WeatherCard
            :location="location"
            :condition="currentWeather?.condition.text"
            :temperature="currentWeather?.temp_c"
            :icon="currentWeather?.condition.icon"
          />
          <div class="col grid-column-equalHeight">
            <div class="col align-items" v-if="weatherForNextHours">
              <template v-for="item in weatherForNextHours" :key="item.time">
                <TimeForecast
                  :time="item.time"
                  :icon="item.condition.icon"
                  :temperature="item.temp_c"
                />
              </template>
            </div>
            <div class="col align-items" v-if="forecastDays">
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

      <LoaderCircle :loading="loading" v-if="loading" />
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
import type { WeatherData, ForecastDay, HourlyForecast, CurrentWeather } from '@/types/WeatherData'
import { getWeatherForNextHours } from '@/utils/utils'
import { prefixedCountries } from '@/constants/prefixed-countries'
import LoaderCircle from '@/components/LoaderCircle.vue'
import SearchInput from '@/components/SearchInput.vue'

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

const updateLocation = (name: string) => {
  searchQuery.value = name
  fetchCityWeekWeather()
}

onMounted(fetchCityWeekWeather)
</script>

<style scoped>
.align-items {
  display: flex;
  justify-content: space-between;
}

.prefixed-countries {
  display: flex;
  flex-direction: row;
}
</style>
