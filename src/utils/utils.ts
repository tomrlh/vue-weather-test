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

export const parseIcon = (code: string): string => {
  const iconMap: { [key: string]: string } = {
    '1000': '/icons/sunny.svg', // Sunny
    '1003': '/icons/partly-cloudy.svg', // Partly cloudy
    '1006': '/icons/cloudy.svg', // Cloudy
    '1009': '/icons/mostly-cloudy.svg', // Overcast
    '1030': '/icons/cloudy.svg', // Mist
    '1063': '/icons/showers.svg', // Patchy rain possible
    '1066': '/icons/snow-flurries.svg', // Patchy snow possible
    '1069': '/icons/sleet.svg', // Patchy sleet possible
    '1072': '/icons/drizzle.svg', // Patchy freezing drizzle possible
    '1087': '/icons/thunderstroms.svg', // Thundery outbreaks possible
    '1114': '/icons/windy.svg', // Blowing snow
    '1117': '/icons/tornado.svg', // Blizzard
    '1135': '/icons/cloudy.svg', // Fog
    '1147': '/icons/cloudy.svg', // Freezing fog
    '1150': '/icons/drizzle.svg', // Patchy light drizzle
    '1153': '/icons/drizzle.svg', // Light drizzle
    '1168': '/icons/drizzle.svg', // Freezing drizzle
    '1171': '/icons/drizzle.svg', // Heavy freezing drizzle
    '1180': '/icons/showers.svg', // Patchy light rain
    '1183': '/icons/showers.svg', // Light rain
    '1186': '/icons/showers.svg', // Moderate rain at times
    '1189': '/icons/showers.svg', // Moderate rain
    '1192': '/icons/showers.svg', // Heavy rain at times
    '1195': '/icons/showers.svg', // Heavy rain
    '1198': '/icons/sleet.svg', // Light freezing rain
    '1201': '/icons/sleet.svg', // Moderate or heavy freezing rain
    '1204': '/icons/sleet.svg', // Light sleet
    '1207': '/icons/sleet.svg', // Moderate or heavy sleet
    '1210': '/icons/snow.svg', // Patchy light snow
    '1213': '/icons/snow.svg', // Light snow
    '1216': '/icons/snow.svg', // Patchy moderate snow
    '1219': '/icons/snow.svg', // Moderate snow
    '1222': '/icons/snow.svg', // Patchy heavy snow
    '1225': '/icons/snow.svg', // Heavy snow
    '1237': '/icons/hail.svg', // Ice pellets
    '1240': '/icons/showers.svg', // Light rain shower
    '1243': '/icons/showers.svg', // Moderate or heavy rain shower
    '1246': '/icons/showers.svg', // Torrential rain shower
    '1249': '/icons/sleet.svg', // Light sleet showers
    '1252': '/icons/sleet.svg', // Moderate or heavy sleet showers
    '1255': '/icons/snow-flurries.svg', // Light snow showers
    '1258': '/icons/snow-flurries.svg', // Moderate or heavy snow showers
    '1261': '/icons/hail.svg', // Light showers of ice pellets
    '1264': '/icons/hail.svg', // Moderate or heavy showers of ice pellets
    '1273': '/icons/isolated-thunderstroms.svg', // Patchy light rain with thunder
    '1276': '/icons/thunderstroms.svg', // Moderate or heavy rain with thunder
    '1279': '/icons/snow-flurries.svg', // Patchy light snow with thunder
    '1282': '/icons/snow-flurries.svg', // Moderate or heavy snow with thunder
    // Default
    default: 'clear-cloudy'
  }

  // Remove any non-numeric characters to ensure matching against keys which are strings of numbers
  const numericCode = code.replace(/\D/g, '')

  // Determine if it's night to append 'night' in icon filename
  const isNight = code.includes('night')
  const timeOfDay = isNight ? 'night' : 'day'

  // Construct file path using the icon name from the map, fall back to default icon if not found
  const iconName = iconMap[numericCode] || iconMap['default']
  const iconPath = `/icons/${iconName}-${timeOfDay}.svg`

  return iconPath
}

/**
 * 1 sunny.svg
2 cloudy.svg
3 clear-cloudy.svg
4 partly-cloudy.svg
5 mostly-cloudy.svg
6 showers.svg
7 drizzle.svg
8 windy.svg
9 hail.svg
10 snow.svg
11 sleet.svg
12 snow-flurries.svg
13 isolated-thunderstroms.svg
14 thunderstroms.svg
15 tornado.svg

 */
