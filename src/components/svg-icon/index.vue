<template>
  <svg aria-hidden='true'>
    <use :class='fillClass' :href='symbolId' :fill='color' />
  </svg>
</template>
<script>
export default {
  name: 'SvgIcon'
}
</script>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  // svgの名前（icon-は不要）
  name: {
    type: String,
    required: true
  },
  // svgの色
  color: {
    type: String
  },
  // svgの様式
  fillClass: {
    type: String
  }
})
// svgの本当の名前を作る（icon-を追加する）
const symbolId = computed(() => `#icon-${props.name}`)
</script>
