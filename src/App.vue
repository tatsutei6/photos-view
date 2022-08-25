<template>
  <div>
    <MobileHome v-if='isMobileDevice()' />
    <PCHome v-else />
  </div>
</template>

<script setup>
import { initREM, initTheme, isMobileDevice } from '@/utils'
import MobileHome from '@/views/mobile-home/index.vue'
import PCHome from '@/views/pc-home/index.vue'

initREM()
initTheme()
</script>


<style scoped>

</style>
