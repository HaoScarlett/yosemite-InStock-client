import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // This points to your project root
  server: {
    port: 5173, // Default port, you can change this if needed
  },
  build: {
    rollupOptions: {
      input: './index.html', // Ensure this points to your entry file
    },
  },
});
