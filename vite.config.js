import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),    
    VitePWA({
      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        id: "sockettest1",
        start_url: "/index.html",
        screenshots : [
          {
            src: "./img/icons/screenshot1.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "./img/icons/screenshot2.png",
            sizes: "320x640",
            type: "image/png",
            form_factor: "narrow"
          }
        ],
        icons: [
          {
            src: "./img/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./img/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./img/icons/android-chrome-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "./img/icons/android-chrome-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "./img/icons/apple-touch-icon-60x60.png",
            sizes: "60x60",
            type: "image/png",
          },
          {
            src: "./img/icons/apple-touch-icon-76x76.png",
            sizes: "76x76",
            type: "image/png",
          },
          {
            src: "./img/icons/apple-touch-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            src: "./img/icons/apple-touch-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "./img/icons/apple-touch-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "./img/icons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "./img/icons/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "./img/icons/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "./img/icons/msapplication-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "./img/icons/mstile-150x150.png",
            sizes: "150x150",
            type: "image/png",
          },
        ]
        
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],		//缓存相关静态资源
        // runtimeCaching: [{		//由于要测试第三方API， 这里配置缓存访问第三方API的资源
        //   handler: 'CacheFirst',
        //   urlPattern: /^https:\/\/jsonplaceholder/,		//注意，要修改成要测试的API。请使用正则表达式匹配
        //   method: 'GET',
        //   options: {
        //     cacheName: 'test-external-api',		//创建缓存名称
        //     expiration: {
        //       maxEntries: 10,
        //       maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
        //     },
        //     cacheableResponse: {
        //       statuses: [0, 200]
        //     }
        //   }
        // }]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
