<template>
  <div class="search-bar">
    <input
      class="search-input"
      type="text"
      placeholder="Search city..."
      :value="modelValue"
      @input="onInput($event)"
    />
    <div class="dropdown-container" v-if="isMobileView">
      <button class="dropdown-button" @click="toggleDropdown">☰</button>
      <div v-if="showDropdown" class="dropdown-menu">
        <FixedCountries
          v-for="item in prefixedCountries"
          :key="item.title"
          :title="item.title"
          :icon="item.icon"
          :onActiveChange="onSelectOption"
          :selectedValue="modelValue"
        />
      </div>
    </div>
  </div>

  <div class="grid">
    <div v-if="!isMobileView" class="col-12 prefixed-countries h-scroll">
      <template v-for="item in prefixedCountries" :key="item.title">
        <FixedCountries
          :title="item.title"
          :icon="item.icon"
          :onActiveChange="onSelectOption"
          :selectedValue="modelValue"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { prefixedCountries } from '@/constants/prefixed-countries'
import { useWindowState } from '@/composables/useWindowState'
import FixedCountries from '@/components/FixedCountries.vue'
const { isMobileView } = useWindowState()

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const props = defineProps({
  modelValue: String,
  searchData: Function
})

const emits = defineEmits(['update:modelValue', 'fetchCityWeekWeather'])

const onSelectOption = (name: string) => {
  showDropdown.value = false
  emits('update:modelValue', name)
  emits('fetchCityWeekWeather', name)
}

const onInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  emits('update:modelValue', inputElement.value)
  emits('fetchCityWeekWeather', inputElement.value)
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #ccc;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  font-size: 1rem;
}

.search-input:focus {
  border-color: #6658f6;
  box-shadow: 0 0 8px rgba(102, 88, 246, 0.2);
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
  display: flex;
}

.dropdown-button {
  display: inline-block;
  margin: 10px;
  padding: 10px 15px;
  background-color: #989eaa;
  color: white;
  width: 50px;
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
