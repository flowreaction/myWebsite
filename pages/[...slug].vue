<template>
    <div
        class="flex h-screen w-screen flex-col items-start justify-start gap-4 pt-8 md:items-center md:gap-12"
    >
        <div
            class="mb-8 flex h-full w-full max-w-xl flex-col items-center justify-center"
        >
            <AnimatedHead
                on-mounted-callback="sad"
                class="mb-16 max-w-xs md:max-w-xl"
                ref="rive"
            />
            <p class="mb-4 text-center text-6xl">404</p>
            <p class="text-center text-2xl">This site doesn't exist</p>
            <NuxtLink
                @mouseover="hover = true"
                @mouseleave="hover = false"
                to="/"
                class="mt-8 flex items-center justify-between gap-3 border px-2 py-2 text-2xl transition-all hover:border-yellow-500 hover:text-yellow-500 md:text-inherit"
            >
                <ArrowLeft /> Back
            </NuxtLink>
            <!-- <p class="text-2xl">send me a message</p> -->
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    pageTransition: {
        name: 'swipe-page-right',
        mode: 'out-in',
    },
})

const hover = ref(false)
const rive = ref(null)
const mounted = ref(false)

watch(hover, (newVal) => {
    if (rive.value) {
        rive.value.resetMouth()
        if (newVal) {
            rive.value.setHappy()
        } else {
            rive.value.setSad()
        }
    }
})
</script>

<style scoped></style>
