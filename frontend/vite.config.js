import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8001,
    open: true,
    host: true, // allows for external device connection on local network
    proxy: {
       // prevent CORS error in dev when backend and frontend servers run on different ports
       '^/auth/*': {
        target: 'http://localhost:3000',
        changeOrigin : true,
       },
       '^/api/.*': {
          target: 'http://localhost:3000',
          changeOrigin: true,
       },
    }
},
})