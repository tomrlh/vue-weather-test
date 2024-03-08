<template>
  <div class="weather-card">
    <div class="weather-icon">
      <!-- Icon placeholder; you'd replace this with your actual weather icon -->
      <img src="#" alt="Weather Icon" />
    </div>
    <div class="weather-info">
      <div class="weather-day-condition">
        <span class="weather-day">Today</span>
        <span class="weather-condition">Frozen</span>
      </div>
      <div class="weather-temperature">2°C</div>
    </div>
  </div>
</template>

<script setup>
// Script setup is a compile-time syntactic sugar feature
// Here you would define your component's logic, props, state, etc.
</script>

<style scoped>
.weather-card {
  background: #e0f7fa;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  max-width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.weather-icon {
  margin-bottom: 16px;
}

.weather-icon img {
  width: 50px; /* Adjust the size as needed */
}

.weather-info {
  font-family: 'Arial', sans-serif;
}

.weather-day-condition {
  margin-bottom: 8px;
}

.weather-day {
  font-size: 1.2em;
  font-weight: bold;
}

.weather-condition {
  font-size: 1em;
  color: #607d8b;
}

.weather-temperature {
  font-size: 2em;
  font-weight: bold;
}
</style>
