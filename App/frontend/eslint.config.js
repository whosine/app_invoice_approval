// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://12.189.245.44:50000/b1s/v1',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://12.189.245.44:50000',
//         changeOrigin: true,
//         secure: false, // because your IP uses HTTPS with likely self-signed cert
//         rewrite: path => path.replace(/^\/api/, '/b1s/v1'),
//       },
//     },
//   },
// });
