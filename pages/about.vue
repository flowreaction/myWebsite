<template>
    <div class="h-screen w-screen pt-8">
        <div class="flex w-full items-start justify-start">
            <NuxtLink
                to="/"
                class="flex items-center justify-between gap-3 text-2xl hover:text-yellow-500 md:text-inherit"
            >
                <ArrowLeft /> Back
            </NuxtLink>
        </div>
        <h1 class="pt-16 text-4xl">About Me</h1>
        <div
            class="mt-4 flex flex-col-reverse items-start justify-between md:flex-row"
        >
            <p class="mt-8 md:w-1/2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
                odit temporibus aspernatur iusto dicta quae iste eum ad et.
                Accusamus impedit, est deleniti sapiente ex nam tempore amet ad
                mollitia voluptatibus commodi officia quisquam dolores cumque
                neque? Natus reprehenderit sapiente, corrupti consectetur
                molestiae alias aliquam neque quasi obcaecati saepe blanditiis!
            </p>
        </div>
        <section>
            <h2 class="pt-16 text-xl">Specialized Knowledge</h2>
            <h1 class="text-4xl">
                Building modern Aplications using industrty Standards
            </h1>
        </section>
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
