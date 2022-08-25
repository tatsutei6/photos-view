<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { initREM, initTheme } from '@/utils'
initREM()
initTheme()
</script>


<style scoped>

</style>
