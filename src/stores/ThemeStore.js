import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'light')

  function SetTheme(newTheme) {
    theme.value = newTheme
    const bodyElement = document.body
    bodyElement.setAttribute('data-bs-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  function getTheme() {
    if (['light', 'dark'].includes(theme.value)) {
      document.body.setAttribute('data-bs-theme', theme.value)
    }
  }

  return { theme, SetTheme, getTheme }
})
