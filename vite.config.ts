import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            includeAssets: ["/favicon.png"],
            strategies: "injectManifest",
            manifest: {
                name: "Combat Wombat",
                short_name: "ComWom",
                description: "A combat app for Rolemaster",
                theme_color: "#fef3c7",
                start_url: "/",
                display: "minimal-ui",
                background_color: "#ffffff",
                icons: [
                    {
                        "src": "/icon-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "/icon-256x256.png",
                        "sizes": "256x256",
                        "type": "image/png"
                    },
                    {
                        "src": "/icon-384x384.png",
                        "sizes": "384x384",
                        "type": "image/png"
                    },
                    {
                        "src": "/icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ],
            },
        }),
    ],
})
