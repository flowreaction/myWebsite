import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    nitro: {
        prerender: {
            routes: ['/', '/about', '/contact', '/success'],
        },
    },
    css: ['@/assets/css/styles.css'],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
    modules: ['@vueuse/nuxt'],
})
