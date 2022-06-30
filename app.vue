<template>
    <div
        class="bg-stone-500 font-mono text-lg leading-relaxed text-neutral-100 transition-colors dark:bg-neutral-900 dark:text-neutral-300"
    >
        <NuxtPage class="mx-auto max-w-5xl px-4" />
    </div>
</template>

<script setup lang="ts">
import '@/assets/css/styles.css'
import { breakpointsTailwind } from '@vueuse/core'

const typeWriter = useTypedText(['Engineer', 'Problem Solver', 'Team Player'], {
    delay: 3000,
    loop: true,
    minSpeed: 50,
    maxSpeed: 100,
})

onMounted(() => {
    typeWriter.start()
})

const isDark = useDark()
const toggleDark = useToggle(isDark)

provide('isDark', { isDark, toggleDark })

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.md
provide('isMobile', isMobile)

useHead({
    titleTemplate: (title) => {
        if (!isMobile.value) {
            return 'Flo Bopp'
        }
        if (title) {
            return `${title} - Florian Bopp -> ${typeWriter.output.value}`
        } else {
            return `Florian Bopp -> ${typeWriter.output.value}`
        }
    },
    meta: [
        {
            name: 'description',
            content: 'Florian Bopp is a software engineer and problem solver.',
        },

        { name: 'og:title', content: 'Florian Bopp 🚀' },
        { name: 'og:site_name', content: 'Florian Bopp 🚀' },
        { name: 'og:url', content: 'florianbopp.com' },
        {
            name: 'og:description',
            content:
                'Florian Bopp - Engineer, Problem Solver, Team Player Check out my blog or contact me for work inquiries.',
        },
        { name: 'og:type', content: 'website' },
        { name: 'og:image', content: '' },
    ],
})
</script>

<style scoped></style>
