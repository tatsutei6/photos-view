import { createRouter, createWebHistory } from 'vue-router'
import { isMobileDevice } from '@/utils'
import mobileDeviceRoutes from './mobile-routes'
import pcDeviceRoutes from './pc-routes'
// 创建 vueRouter 实例
const router = createRouter({
  history: createWebHistory(),
  routes: isMobileDevice() ? mobileDeviceRoutes : pcDeviceRoutes
})

export default router
