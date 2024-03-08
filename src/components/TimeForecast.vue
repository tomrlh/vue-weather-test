<template>
  <div class="col container">
    <div class="weather-time">Now</div>
    <div class="weather-icon">
      <!-- Weather icon here (You can use an img tag or an icon library) -->
      <img src="#" alt="Weather Icon" />
    </div>
    <div class="weather-temp">2°C</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.weather-time {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.weather-icon {
  display: inline-block;
  background-color: #e0f2ff;
  border-radius: 50%;
  padding: 20px;
  margin-bottom: 10px;
}

.weather-temp {
  font-size: 24px;
  font-weight: bold;
}
</style>
