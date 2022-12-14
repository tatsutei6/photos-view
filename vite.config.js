import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/photos-view/dist/',
  plugins: [vue(), DefineOptions(),
    createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[name]'
  })],
  // 软链接
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  }
})
