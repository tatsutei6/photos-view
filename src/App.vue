<template>
  <div>
    <MobileHome v-if='isMobileDevice()' />
    <PCHome v-else />
  </div>
</template>

<script setup>
import { initREM, initTheme, isMobileDevice } from '@/utils'
import MobileHome from '@/views/MobileHome.vue'
import PCHome from '@/views/PCHome.vue'

initREM()
initTheme()
</script>


<style scoped>

</style>
