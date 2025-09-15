import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          leaflet: ['leaflet', 'react-leaflet'],
          router: ['react-router-dom'],
          fontawesome: ['@fortawesome/fontawesome-free']
        },
        // Otimizar nomes de chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000,
    // Otimizações adicionais
    cssCodeSplit: true,
    brotliSize: false,
    modulePreload: false
  },
  server: {
    port: 3000,
    host: true,
    // Otimizações para desenvolvimento
    fs: {
      strict: false
    }
  },
  preview: {
    port: 4173,
    host: true
  },
  publicDir: 'public',
  // Otimizações gerais
  resolve: {
    alias: {
      // Otimizar imports
      '@': '/src'
    }
  },
  // Otimizações de CSS
  css: {
    postcss: './postcss.config.js'
  }
});
