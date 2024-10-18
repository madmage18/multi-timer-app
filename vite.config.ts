import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
    host: "0.0.0.0", // Ensure the server is accessible externally
    strictPort: true, // Fail if the port is already in use
  },
})
