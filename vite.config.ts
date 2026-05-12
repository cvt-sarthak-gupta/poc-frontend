import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Split large vendor libs into separate cacheable chunks
        manualChunks: (id: string) => {
          if (id.includes('node_modules/antd') || id.includes('node_modules/@ant-design')) {
            return 'vendor-antd'
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/@tanstack')) {
            return 'vendor-query'
          }
          if (id.includes('node_modules/axios')) {
            return 'vendor-axios'
          }
        },
      },
    },
  },
})
