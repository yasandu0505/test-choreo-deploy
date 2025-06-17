import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  return {
    base: '/',
    plugins: [react()],
    // server: {
    //   proxy: {
    //     '/v1': {
    //       target:'http://localhost:8081',
    //       changeOrigin: true,
    //       secure: false,
    //       rewrite: (path) => path.replace(/^\/v1/, '/v1'),
    //     }
    //   }
    // }
  }
})
