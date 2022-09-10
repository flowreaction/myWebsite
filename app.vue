<template>
    <Body class="bg-white dark:bg-black"></Body>
    <div
        class="bg-white font-mono text-lg leading-relaxed text-gray-800 transition-colors dark:bg-black dark:text-neutral-300"
    >
        <NuxtPage class="mx-auto min-h-screen max-w-5xl p-4" />
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
onBeforeMount(() => {
    isDark.value = true
})
const toggleDark = useToggle(isDark)

provide('isDark', { isDark, toggleDark })

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.md
provide('isMobile', isMobile)

const isMobileUA = ref(false)
onBeforeMount(() => {
    isMobileUA.value =
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            window.navigator.userAgent
        )
})
provide('isMobileUA', isMobileUA)

useHead({
    titleTemplate: (title) => {
        if (!isMobile.value) {
            return 'Flo Bopp'
        }
        if (title) {
            return `Florian Bopp -> ${title}`
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
                'Florian Bopp - Engineer, Problem Solver, Team Player => Check out my blog or contact me for work inquiries.',
        },
        { name: 'og:type', content: 'website' },
        { name: 'og:image', content: '/og.png' },
    ],
})
</script>

<style scoped></style>
