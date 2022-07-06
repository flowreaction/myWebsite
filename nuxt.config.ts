import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
    modules: ['@vueuse/nuxt', '@nuxtjs/supabase'],
    supabase: {
        url: 'https://sexidxjqpmirqtzubrew.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNleGlkeGpxcG1pcnF0enVicmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY5MzgzNDIsImV4cCI6MTk3MjUxNDM0Mn0.dznKSD0bIos1BMsnhKTY8vPd8omWXNEOVj_fAxQhb2g',
    },
})
