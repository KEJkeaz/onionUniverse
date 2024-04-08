import { createApp } from 'vue'

import App from './App.vue'
import axios from './utills/hooks/axiosWrapper'
import store from "./stores/index";

import commonFunc from './utills/commonFunc'
import commonVariable from './utills/commonVariable'


// modules

import 'normalize.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'



import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas, far, fab)


// vuetify
import { registerPlugins } from '@/utills/plugins'

const app = createApp(App)

app.config.globalProperties.axios = axios



for (const variable in commonVariable) {
  app.config.globalProperties[variable] = commonVariable[variable]
}

for (const func in commonFunc) {
  app.config.globalProperties['$'+func] = commonFunc[func]
}



app.component('font-awesome-icon', FontAwesomeIcon)

registerPlugins(app)
async function StartApp(){
  try {
    await store.dispatch('initSPA')
    app.use(store)

    app.mount('#app')
  }
  catch(error) {
    alert("Initialize failed.")
  }
}

StartApp()