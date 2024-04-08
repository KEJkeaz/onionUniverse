import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { visualizer } from "rollup-plugin-visualizer";
import mkcert from'vite-plugin-mkcert'
import moment from 'moment'
import path from 'node:path' 
import globalLess from './src/assets/css/global.json'
import * as fs from 'fs'
import * as os from 'os'
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'


DIST_DIR = 'dist'
let dt = moment().format("yyyyMMDD-HHmmss")

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  define: {
  //   "process.env": {
    BUILD_STAMP: JSON.stringify("Build At: " + dt)
  },
  optimizeDeps: {
    exclude: ['vuetify'],
  },
  build: {
    outDir: `../../${DIST_DIR}`,
    emptyOutDir: true,
    transpile: ['vuetify'],
  },
  plugins: [    
    importToCDN({ 
      modules: [{ 
        name: 'moment',
        var: 'moment',
        path: 'https://cdn.jsdelivr.net/npm/moment@2.29.4/min/moment-with-locales.js'   
      }, {
      //   name: 'moment-duration-format',
      //   var: 'momentDurationFormatSetup',
      //   path: "https://cdn.jsdelivr.net/npm/moment-duration-format@2.3.2/lib/moment-duration-format.js"
      // }, {
        name: 'ramda',
        var: 'R',
        path: "https://cdn.jsdelivr.net/npm/ramda@0.29.1/dist/ramda.js"
      }, {
        name: 'ramda-adjunct',
        var: 'RA',
        path: "https://cdn.jsdelivr.net/npm/ramda-adjunct@4.1.1/dist/RA.web.standalone.js" 
      }, {
        name: 'axios',
        var: 'axios',
        path: "https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.js"
      }, {
      //   name: '@fortawesome/fontawesome-free',
      //   var: 'FontAwesome',
      //   path: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/js/fontawesome.js'
      // }, {
        name: '@fortawesome/fontawesome-svg-core',
        var: 'globalThis["fontawesome-svg-core"]',
        path: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-svg-core@6.5.1/index.js'
      }, {
        name: '@fortawesome/free-brands-svg-icons',
        var: 'globalThis["free-brands-svg-icons"]',
        path: 'https://cdn.jsdelivr.net/npm/@fortawesome/free-brands-svg-icons@6.5.1/index.js'
      }, {
        name: '@fortawesome/free-solid-svg-icons',
        var: 'globalThis["free-solid-svg-icons"]',
        path: 'https://cdn.jsdelivr.net/npm/@fortawesome/free-solid-svg-icons@6.5.1/index.js'
      }, {
        name: '@fortawesome/free-regular-svg-icons',
        var: 'globalThis["free-regular-svg-icons"]',
        path: 'https://cdn.jsdelivr.net/npm/@fortawesome/free-regular-svg-icons@6.5.1/index.js'
      }, {
        name: 'vue',
        var: 'Vue', 
        path: 'https://cdn.jsdelivr.net/npm/vue@3.4.15/dist/vue.global.js'
      // }, {
      //   name: 'vuetify',
      //   var: 'Vuetify', 
      //   path: 'https://cdn.jsdelivr.net/npm/vuetify@3.5.2/dist/vuetify.js',
      //   css: 'https://cdn.jsdelivr.net/npm/vuetify@3.5.2/dist/vuetify.min.css'
      }]
    }),
    mkcert(),
    visualizer({ filename: `./${DIST_DIR}/stat.html` }),
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/assets/css/vuetify/settings.scss',
      },
    }),{
      writeBundle: (opt)=> {
        let fp = path.resolve(opt.dir, `BUILD_STAMP.txt` )
        fs.writeFileSync(fp, `Proj. Dir: ${__dirname}\nMachine: ${os.hostname()}\nBuild At: ${moment()}`)
        console.log("Write Version file:", fp)
        // console.log('writeBundle',new Date(), opt)   
      } 
    }
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: globalLess,
        javascriptEnabled: true,
      },
    },
  },

  resolve: {
    alias: {
      '~css': fileURLToPath(new URL('./src/assets/css', import.meta.url)),
      '~components': fileURLToPath(new URL('./src/assets/css/components', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/components/common', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/connect': 'http://localhost:3333',
      '/api': 'http://localhost:3333'
    }
  },
})
