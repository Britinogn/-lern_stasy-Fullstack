import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  
  //   darkMode: 'class', // use class strategy
  //   content: [
  //   "./src/components/HelloWorld.vue",
  //   "./src/**/*.{vue,js,ts,jsx,tsx}",
  // ],
  //   theme: {
  //       extend: {
  //         colors: {
  //           brand: {
  //             primary: '#1E3A8A',   // deep blue
  //             accent: '#3B82F6',    // sky blue
  //             secondary: '#10B981', // green
  //             warning: '#FACC15',   // yellow
  //             darkbg: '#111827',    // dark background
  //             lightbg: '#F9FAFB',   // light background
  //           },
  //         },
  //       },
  //   },


  plugins: [vue() , tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fav.ico'],
      manifest: {
        name: 'LernStasy',
        short_name: 'LernStasy',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0ea5e9',
        icons: [
          {
            "src": "/images/fav.ico",
            "sizes": "192x192",
            "type": "image/x-icon"
          },
          {
            "src": "/images/fav.ico",
            "sizes": "512x512",
            "type": "image/x-icon"
          }
        ]
      }
    })
  ],

  
})
