import { onMounted, onUnmounted, ref } from 'vue'

export function useWindowState() {
  const isMobileView = ref(window.innerWidth <= 998)

  const updateViewType = () => {
    isMobileView.value = window.innerWidth <= 998
  }

  onMounted(() => {
    window.addEventListener('resize', updateViewType)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateViewType)
  })

  return {
    isMobileView
  }
}
