import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@UI': path.resolve(__dirname, 'src/Shared/UI/'),
            '@assets': path.resolve(__dirname, 'src/Shared/UI/assets'),
        },
    },
    base: '/',
    server: {
        host: true,
        port: 5173,
    },
    preview: {
        host: true,
        port: 5173,
    },
})
