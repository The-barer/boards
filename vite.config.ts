import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import fs from 'fs'
const oneYearInSeconds = 60 * 60 * 24 * 365

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
        https: {
            key: fs.readFileSync('./Secret/Local.key'),
            cert: fs.readFileSync('./Secret/Local.crt'),
        },
    },
    preview: {
        host: true,
        port: 5173,
        headers: {
            'Strict-Transport-Security': `max-age=${oneYearInSeconds}`,
        },
        https: {
            key: fs.readFileSync('./Secret/boards-key.pem'),
            cert: fs.readFileSync('./Secret/boards-cert.crt'),
        },
    },
})
