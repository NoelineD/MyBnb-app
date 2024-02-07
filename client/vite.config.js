import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginWindicss from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginWindicss(), // Ajoutez le plugin WindiCSS
  ],
});
