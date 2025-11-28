<script setup>
import { RouterView } from 'vue-router'
import Footer from './components/layout/Footer.vue'
import Header from './components/layout/Header.vue'
import { onMounted } from 'vue'
import { useThemeStore } from './stores/ThemeStore'


onMounted(() => {
  useThemeStore().getTheme();
})

</script>




<template>

  <div class="d-flex flex-column min-vh-100 ">
    <Header></Header>
    <div class="flex-grow-1">

      <RouterView />
    </div>
    <Footer></Footer>

  </div>
</template>
