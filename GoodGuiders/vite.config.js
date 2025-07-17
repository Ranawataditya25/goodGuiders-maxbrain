import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/bootstrapreact/medixo/', // Updated to match your project path
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'), // Ensure this path is correct
    },
  },
});
