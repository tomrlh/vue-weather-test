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
    return '#C3E0FB' // blue
  } else if (temperature > 0 && temperature <= 15) {
    return '#E4F0FE' // bright-blue
  } else if (temperature > 15 && temperature <= 25) {
    return '#CDF0EB' // green
  } else if (temperature > 25 && temperature <= 30) {
    return '#FFF4DA' // yellow
  } else {
    return '#FDD4D7' // red
  }
}
