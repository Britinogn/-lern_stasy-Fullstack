import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}


createApp(App).use(router).mount('#app')