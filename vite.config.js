import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  console.log('[VITE CONFIG] VITE_API_PROXY_TARGET =', env.VITE_API_PROXY_TARGET)

  return {
    base: '/',
    plugins: [react()],
    server: {
      proxy: {
        '/v1': {
          target: env.VITE_API_PROXY_TARGET || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/v1/, '/v1'),
        }
      }
    }
  }
})
