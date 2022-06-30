<template>
    <div
        class="flex h-screen w-screen flex-col items-start justify-start gap-4 pt-8 md:items-center md:gap-12"
    >
        <div class="flex w-full items-start justify-start">
            <NuxtLink
                to="/"
                class="flex items-center justify-between gap-3 text-2xl hover:text-yellow-500 md:text-inherit"
            >
                <ArrowLeft /> Back
            </NuxtLink>
        </div>
        <div
            class="mb-8 flex h-full w-full max-w-xl flex-col items-center justify-center"
        >
            <span class="mb-4 text-center text-4xl">
                ✅ Message was sent! <br />
            </span>
            <span class="text-center text-2xl">
                I will get back to you as soon as possible. Thank you!
            </span>
            <NuxtLink
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
</script>

<style scoped></style>
