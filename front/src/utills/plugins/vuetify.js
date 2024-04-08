/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import * as VSkeletonLoader from 'vuetify/labs/VSkeletonLoader';

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: { ...VSkeletonLoader },
  theme: {
    themes: {
      light: {
        colors: {
          brendColor: '#246e75',
          brendColorLight: "#3cb8c3",
          brendColorDark: "#12373b",
          brendColorGray: "#677B7D",
          primary: '#1867C0',
          secondary: '#5CBBF6',
          warningColor: "#e69720",
          white: "#fff",
          black: "#000",
        },
      },
    },
  },
})
