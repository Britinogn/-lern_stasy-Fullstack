import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'


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


  plugins: [vue() , tailwindcss()],
})
