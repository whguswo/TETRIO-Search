import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir:`${__dirname}/public`,
    build:{
        emptyOutDir:true,
        outDir:`${__dirname}/dist`,
        rollupOptions:{
            input:{
                popup:`${__dirname}/src/html/popup2.html`,
                background:`${__dirname}/src/js/background.ts`
            },
            output:{
                entryFileNames:'js/[name].js',
                assetFileNames:'css/[name].css'
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
        }
    },
    root:'./src'
})
