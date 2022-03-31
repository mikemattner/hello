import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Calendar, DatePicker } from 'v-calendar';
import SetupCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(SetupCalendar)

app.component('Calendar', Calendar)
app.component('DatePicker', DatePicker)

app.mount('#app')
