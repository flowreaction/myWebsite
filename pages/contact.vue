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
        <div class="mb-8">
            <h1 class="mb-4 text-4xl">Contact</h1>
            <p class="text-2xl">send me a message</p>
        </div>
        <form
            name="contact"
            ref="contactform"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            @submit.prevent="
                useNetlifySubmit(
                    $event,
                    '/registernetlifyform.html',
                    '/success'
                )
            "
            class="flex w-full max-w-lg flex-col gap-12 px-4 md:w-1/2"
        >
            <!-- @submit="handleSubmit($event, '/success/')" -->
            <input type="hidden" name="form-name" value="contact" />
            <p>
                <label class="block"
                    >Your Name:
                    <input
                        required
                        ref="nameinput"
                        type="text"
                        name="name"
                        class="mt-0 block w-full border-0 border-b-2 border-gray-200 bg-slate-200 px-0.5 focus:border-yellow-500 focus:ring-0 dark:bg-black"
                /></label>
            </p>
            <p>
                <label
                    >Your Email:
                    <input
                        required
                        ref="emailinput"
                        type="email"
                        name="email"
                        class="mt-0 block w-full border-0 border-b-2 border-gray-200 bg-slate-200 px-0.5 invalid:border-pink-500 invalid:text-pink-600 focus:border-yellow-500 focus:ring-0 dark:bg-black"
                /></label>
            </p>
            <p>
                <label
                    >Message:
                    <textarea
                        required
                        ref="messageinput"
                        name="message"
                        class="mt-0 block w-full border-0 border-b-2 border-gray-200 bg-slate-200 px-0.5 focus:border-yellow-500 focus:ring-0 dark:bg-black md:h-32"
                    ></textarea>
                </label>
            </p>
            <p>
                <button
                    type="submit"
                    ref="submitbutton"
                    class="border px-4 py-2 hover:border-yellow-500 hover:text-yellow-500 dark:hover:cursor-paperplane"
                >
                    Send
                </button>
            </p>
        </form>
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
