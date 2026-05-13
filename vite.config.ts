
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    // Fix: Use __dirname instead of process.cwd() as process.cwd() may not be typed in this environment's Process definition
    const env = loadEnv(mode, __dirname, '');
    // Prioritize system env API_KEY, then .env files
    const apiKey = process.env.API_KEY || env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || '';
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(apiKey),
        'process.env.NODE_ENV': JSON.stringify(mode),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'framer-motion', 'lucide-react']
            }
          }
        }
      }
    };
});
