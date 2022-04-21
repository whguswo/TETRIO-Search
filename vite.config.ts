import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte()
  ],
  publicDir:path.resolve(__dirname, 'public'),
  build:{
      emptyOutDir:true,
      outDir:path.resolve(__dirname, 'dist'),
      rollupOptions:{
          input:{
            popup:path.resolve(__dirname, 'html/popup.html'),
            background:path.resolve(__dirname, 'src/entry/background.ts'),
          },
          output:{
              entryFileNames:'js/[name].js',
              assetFileNames:'[ext]/[name].[ext]',
          }
      }
  },
  server:{
      open:'/html/popup.html',
      proxy:{
          '/api':{
              target:'https://ch.tetr.io',
              changeOrigin:true,
              secure:true,
          }
      },
  },
  // root:'./src',
})
