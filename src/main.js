import './assets/main.css'

import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// Use the toast plugin globally
app.use(Toast, {
  timeout: 1500, // This sets the global toast timeout to 1 second
})

app.mount('#app')
