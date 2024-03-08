<template>
  <div class="search-bar">
    <input
      class="search-input"
      type="text"
      placeholder="Search city..."
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  modelValue: String,
  fetchData: Function
})

const onInput = () => {
  if (props.fetchData) {
    props.fetchData()
  }
}
</script>

<style scoped>
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
</style>
