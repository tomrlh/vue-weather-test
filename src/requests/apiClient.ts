import type { WeatherData } from '@/types/WeatherData'
import axios from 'axios'

const API_KEY = '17a0ea6d3af24151a23170312240403'
const BASE_URL = 'https://api.weatherapi.com/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

export const cityWeather = async (city: string) => {
  try {
    const response = await apiClient.get(`/current.json?key=${API_KEY}&q=${city}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const cityWeekWeather = async (city: string): Promise<WeatherData | undefined> => {
  try {
    const response = await apiClient.get<WeatherData>(
      `/forecast.json?key=${API_KEY}&q=${city}&days=7`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// http://api.weatherapi.com/v1/current.json?key=17a0ea6d3af24151a23170312240403&q=London

// http://api.weatherapi.com/v1/forecast.json?key=17a0ea6d3af24151a23170312240403&q=07112&days=7
