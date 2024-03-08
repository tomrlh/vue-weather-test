import type { HourlyForecast } from '@/types/WeatherData'

export const checkDate = (dateInput: string): string => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const inputDate = new Date(dateInput)

  today.setHours(0, 0, 0, 0)
  inputDate.setHours(0, 0, 0, 0)
  tomorrow.setHours(0, 0, 0, 0)

  if (inputDate.getTime() === today.getTime()) {
    return 'Today'
  } else if (inputDate.getTime() === tomorrow.getTime()) {
    return 'Tomorrow'
  } else {
    return new Intl.DateTimeFormat('default', { weekday: 'long' }).format(inputDate)
  }
}

export const getTemperatureColor = (temperature: number): string => {
  if (temperature <= 0) {
    return '#C3E0FB'
  } else if (temperature > 0 && temperature <= 15) {
    return '#E4F0FE'
  } else if (temperature > 15 && temperature <= 25) {
    return '#CDF0EB'
  } else if (temperature > 25 && temperature <= 30) {
    return '#FFF4DA'
  } else {
    return '#FDD4D7'
  }
}

export const getWeatherForNextHours = (hourlyData: HourlyForecast[]) => {
  const now = new Date()
  const currentHour = now.getHours()
  const currentIndex = hourlyData.findIndex((data) => {
    const date = new Date(data.time_epoch * 1000)
    return date.getHours() === currentHour
  })
  const startIndex = currentIndex === -1 ? 0 : currentIndex
  const hoursNeeded = 5
  const endIndex = startIndex + hoursNeeded

  return hourlyData.slice(startIndex, endIndex)
}

export const formatTime = (time24: string): string => {
  const date = new Date(time24)
  const now = new Date()
  if (
    now.getHours() === date.getHours() &&
    now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear()
  ) {
    return 'Now'
  }
  let hours = date.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  const time12 = `${hours} ${ampm}`
  return time12
}

export const darkenColor = (hex: string): string => {
  hex = hex.replace(/^\s*#|\s*$/g, '')
  const amount = 20
  const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - amount)
  const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - amount)
  const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - amount)

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0')}`
}
