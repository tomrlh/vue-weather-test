<template>
  <div class="grid">
    <div class="col-10" data-push-left="off-1">
      <Header />

      <FixedCountries title="Denver" />

      <div class="grid">
        <div class="col grid-equalHeight">
          <div class="col">
            <WeatherCard
              cityName="Denver"
              weatherDescription="Snowing"
              temperature="2"
              weatherIcon="path-to-snow-icon.png"
            />
          </div>
          <div class="col grid-column-equalHeight">
            <div class="col">
              <TimeForecast />
            </div>
            <div class="col"><DayForecast /></div>
          </div>
          <div class="col grid-column-equalHeight">
            <div class="col">
              <TimeForecast />
            </div>
            <div class="col">
              <DayForecast />
            </div>
          </div>
          <div class="col grid-column-equalHeight">
            <div class="col">
              <TimeForecast />
            </div>
            <div class="col">
              <DayForecast />
            </div>
          </div>
          <div class="col grid-column-equalHeight">
            <div class="col">
              <TimeForecast />
            </div>
            <div class="col">
              <DayForecast />
            </div>
          </div>
          <div class="col grid-column-equalHeight">
            <div class="col">
              <TimeForecast />
            </div>
            <div class="col">
              <DayForecast />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/GlobalHeader.vue'
import FixedCountries from '@/components/FixedCountries.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import TimeForecast from '@/components/TimeForecast.vue'
import DayForecast from '@/components/DayForecast.vue'
</script>

<style scoped></style>
