<template>
  <div class="grid">
    <div class="col-10" data-push-left="off-1">
      <Header />

      <SearchInput v-model="searchQuery" @input="fetchCityWeekWeather" />

      <div class="grid">
        <div v-if="!isMobileView" class="col-12 prefixed-countries h-scroll">
          <template v-for="item in prefixedCountries" :key="item.title">
            <FixedCountries
              :title="item.title"
              :icon="item.icon"
              :onActiveChange="updateLocation"
              :selectedValue="searchQuery"
            />
          </template>
        </div>
        <div class="dropdown-container" v-else>
          <button class="dropdown-button" @click="toggleDropdown">☰</button>
          <div v-if="showDropdown" class="dropdown-menu">
            <FixedCountries
              v-for="item in prefixedCountries"
              :key="item.title"
              :title="item.title"
              :icon="item.icon"
              :onActiveChange="updateLocation"
              :selectedValue="searchQuery"
            />
          </div>
        </div>
      </div>

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
              <template v-for="item in weatherForNextHours" :key="item.time">
                <TimeForecast
                  :time="item.time"
                  :icon="item.condition.icon"
                  :temperature="item.temp_c"
                />
              </template>
            </div>
            <div class="col align-items" v-if="forecastDays && !isMobileView">
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

      <div class="grid" v-if="isMobileView">
        <template v-for="item in forecastDays" :key="item.date_epoch">
          <MobileDayForecast
            :date="item.date"
            :icon="item.day.condition.icon"
            :condition="item.day.condition.text"
            :temperature="item.day.maxtemp_c"
          />
        </template>
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
import MobileDayForecast from '@/components/MobileDayForecast.vue'
import { cityWeekWeather } from '@/requests/apiClient'
import type { WeatherData, ForecastDay, HourlyForecast, CurrentWeather } from '@/types/WeatherData'
import { getWeatherForNextHours } from '@/utils/utils'
import { prefixedCountries } from '@/constants/prefixed-countries'
import LoaderCircle from '@/components/LoaderCircle.vue'
import SearchInput from '@/components/SearchInput.vue'
import { useWindowState } from '@/composables/useWindowState'

const { isMobileView } = useWindowState()

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

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
  showDropdown.value = false
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
  width: 100%;
}

.h-scroll {
  overflow-x: auto;
  gap: 10px;
}

.dropdown-container {
  width: 100%;
  display: flex;
}

.dropdown-button {
  display: inline-block;
  margin: 10px;
  padding: 10px 15px;
  width: auto;
  background-color: #989eaa;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.dropdown-button:hover,
.dropdown-button:focus {
  background-color: #989eaa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  outline: none;
}

.dropdown-button:focus-visible {
  box-shadow:
    0 0 0 2px #fff,
    0 0 0 4px #989eaa;
}

.dropdown-menu {
  position: absolute;
  top: 1%;
  left: 10%;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
</style>
