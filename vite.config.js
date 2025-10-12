import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows the server to be accessible externally
    // Add your Cloudflare Tunnel hostname here
    allowedHosts: [
      'queue-ceiling-vids-helping.trycloudflare.com', // Replace with your actual Cloudflare Tunnel URL
      '.trycloudflare.com' ,
      'blogdemo.loca.lt'// You can also add this to allow all .trycloudflare.com subdomains
    ],
  },
});
