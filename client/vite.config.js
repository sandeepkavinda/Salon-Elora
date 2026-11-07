import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:5174' },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText'],
          framer: ['framer-motion'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
