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

const isDark = useDark()
const toggleDark = useToggle(isDark)

provide('isDark', { isDark, toggleDark })

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.md
provide('isMobile', isMobile)
</script>

<style scoped></style>
