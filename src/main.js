import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import store from './store'
import 'virtual:svg-icons-register'
import directive from './directives'


createApp(App).use(store).use(directive).mount('#app')
