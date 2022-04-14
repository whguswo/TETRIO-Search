import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    publicDir:path.resolve(__dirname, 'public'),
    build:{
        emptyOutDir:true,
        outDir:path.resolve(__dirname, 'dist'),
        rollupOptions:{
            input:{
                popup:path.resolve(__dirname, 'src/html/popup.html'),
                background:path.resolve(__dirname, 'src/js/background.ts')
            },
            output:{
                entryFileNames:'js/[name].js',
                assetFileNames:'css/[name].css'
            }
        }
    },
    server:{
        open:'/html/popup.html'
    },
    root:'./src'
});