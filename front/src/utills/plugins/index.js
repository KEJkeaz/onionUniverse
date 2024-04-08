/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from '@/utills/plugins/vuetify'
import router from '@/router'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
}