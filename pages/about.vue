<template>
    <div class="pt-8">
        <div class="flex w-full items-start justify-start">
            <NuxtLink
                to="/"
                class="flex items-center justify-between gap-3 text-2xl hover:text-yellow-500 md:text-inherit"
            >
                <ArrowLeft /> Back
            </NuxtLink>
        </div>
        <article class="prose mx-auto w-full dark:prose-invert md:prose-xl hover:prose-a:opacity-60 transition-all">
            <!-- <h1 class="pt-16 text-4xl">About Me</h1> -->
            <section
                class="mt-4 flex flex-col-reverse items-start justify-between gap-8 md:flex-row"
            >
                <div class="mt-8 text-2xl md:w-1/2">
                    <h2>Hey, I'm Florian</h2>
                    <p class="mb-2">
                        <br />
                        father, software engineer and coffee nerd.
                        <!-- <CoffeeIcon class="inline h-8 w-8" /> -->
                    </p>
                    <p>
                        I primarily build frontend applications, but I'm also
                        building backend systems, embedded software,
                        machine learning and data science projects.
                    </p>
                    
                </div>
                <div
                    class="flex h-full grow items-center justify-center md:w-2/5"
                >
                    <AnimatedHead class="mx-auto w-full md:mt-20" />
                </div>
            </section>
            <section>
                <p>
                    Check out my <NuxtLink to="/blog">Blog</NuxtLink> to see
                    what I am currently interested in.
                    <hr>
                    <NuxtLink to="/contact">Contact me</NuxtLink> if you want to work
                    with me or have other inquiries.
                </p>
            </section>
            <!-- <section class="relative z-20">
                <h2 class="pt-16 text-xl">Specialized Knowledge</h2>
                <h1 class="mb-16 text-4xl">
                    Building modern Aplications using industrty Standards
                </h1>
                <div class="flex flex-row-reverse items-start justify-center">
                    <LogoBanner class="w-1/6" />
                    <div class="relative h-full w-5/6">
                        <h2
                            class="absolute text-3xl line-through decoration-yellow-500 opacity-30"
                        >
                            My Projects
                        </h2>
                        <h2
                            class="text absolute rotate-6 text-4xl text-yellow-500 md:hidden"
                        >
                            Coming Soon
                        </h2>
                        <div
                            class="relative mt-8 flex h-full w-full flex-wrap justify-center gap-4 pt-8 md:gap-8"
                        >
                            <p
                                class="text absolute left-1/2 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 rotate-6 whitespace-nowrap text-7xl font-bold text-yellow-500 md:inline"
                            >
                                coming soon
                            </p>

                            <div
                                v-for="i in 6"
                                class="h-64 w-3/4 overflow-clip rounded-md bg-neutral-600 md:w-1/4"
                            >
                                <div class="relative blur">
                                    <h1
                                        class="text absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-3xl font-black text-yellow-500"
                                    >
                                        Project {{ i }}
                                    </h1>
                                    <img
                                        :src="`https://picsum.photos/300/400.webp?blur=2?random=${i}`"
                                        class="h-full w-full object-cover brightness-50 transition-all hover:brightness-75"
                                        laoding="lazy"
                                        alt="project image"
                                        title="project image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> -->
        </article>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'About Me',
})
</script>

<style scoped></style>
