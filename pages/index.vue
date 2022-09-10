<template>
    <div class="flex flex-col justify-center gap-4">
        <div>
            <Motion
                :initial="{ y: -20, opacity: 0 }"
                :animate="{
                    y: 0,
                    opacity: 1,
                }"
                :transition="{
                    duration: 1,
                    ease: 'ease-out',
                }"
            >
                <div
                    ref="mainHeader"
                    class="mb-4 ml-16 mt-8 text-left text-5xl font-semibold text-neutral-900 dark:text-white md:text-6xl lg:text-8xl"
                >
                    Florian <br />
                    Bopp
                </div>
                <div
                    class="mt-16 max-w-md select-none rounded-xl bg-neutral-800 p-2 pl-3 text-2xl focus:border-yellow-500 dark:bg-black md:max-w-2xl md:p-4 md:text-4xl lg:text-5xl"
                >
                    <span class="mr-2 text-yellow-500">></span>
                    <TypeWriter
                        :texts="typedTexts"
                        caret="_"
                        caretColor="yellow"
                        :options="typeWriteOptions"
                    >
                    </TypeWriter>
                </div>
            </Motion>
        </div>
        <div
            class="flex grow items-center justify-between pb-16 text-end md:mx-16 md:items-center"
        >
            <div class="z-0 w-1/2 md:w-1/3">
                <Motion
                    :initial="{ opacity: 0 }"
                    :animate="{
                        opacity: 1,
                    }"
                    :transition="{
                        // delay: 1,
                        duration: 2,
                        easing: 'ease',
                    }"
                >
                    <AnimatedHead
                        ref="rive"
                        class="top-0 max-w-xs -translate-x-32 md:max-w-[250px] md:-translate-x-12"
                    />
                </Motion>
            </div>
            <Transition name="fade" mode="out-in">
                <div
                    class="z-10 w-64"
                    :class="{ hidden: !anyHovered || !isMobile }"
                    :key="descriptionBox"
                >
                    <p
                        class="hidden text-start transition-all md:inline md:max-w-md"
                    >
                        {{ descriptionBox }}
                    </p>
                </div>
            </Transition>

            <nav
                class="flex w-1/2 flex-col justify-around self-stretch md:w-1/3"
            >
                <div class="flex flex-col">
                    <Motion
                        v-for="(item, index) in navItems"
                        :initial="{ x: 20, opacity: 0 }"
                        :animate="{
                            x: 0,
                            opacity: 1,
                        }"
                        :transition="{
                            delay: index / 20,
                            duration: 1,
                            easing: 'ease',
                        }"
                    >
                        <NuxtLink
                            ref="links"
                            :key="item.id"
                            @mouseover.native="item.flag = true"
                            @mouseleave.native="item.flag = false"
                            :to="item.href"
                            class="navlink flex items-center justify-end gap-2 text-3xl transition-all hover:text-black dark:hover:text-white md:text-3xl"
                            :class="{
                                'hover:line-through': item.id === 'blog',
                                'opacity-50': !item.flag && anyHovered,
                            }"
                        >
                            <Transition name="externallink">
                                <ExternalLinkIcon
                                    v-if="item.flag && item.external"
                                />
                            </Transition>
                            {{ item.text }}
                        </NuxtLink>
                    </Motion>
                </div>
                <Motion
                    :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }"
                    :transition="{
                        duration: 1,
                        ease: 'ease-out',
                    }"
                >
                    <button
                        @click="toggleDark()"
                        class="z-10 cursor-sun text-right hover:text-yellow-500"
                        :class="{
                            'cursor-sun ': isDark,
                            'cursor-moon ': !isDark,
                        }"
                    >
                        {{ isDark ? 'lighten' : 'darken' }}
                    </button>
                </Motion>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { typedTextOptions } from '~~/composables/useTypedText'
import { Motion } from 'motion/vue'
import { stagger } from 'motion'

const isMobile = inject('isMobile')
const rive = ref(null)

definePageMeta({
    layout: 'default',
    pageTransition: {
        name: 'swipe-page-left',
        mode: 'out-in',
        appear: true,
    },
})

const { isDark, toggleDark } = inject('isDark')

const anyHovered = computed(() => {
    return navItems.some((item) => item.flag)
})

const mainHeader = ref<HTMLElement>(null)

const descriptionBox = computed(() => {
    const currKey = Object.keys(navItems)
        .filter((key) => navItems[key].flag)
        .shift()

    if (currKey) {
        return navItems[currKey].description
    } else {
        return ''
    }
})

const navItems = reactive([
    {
        text: 'About me',
        href: '/about',
        external: false,
        id: 'about',
        flag: false,
        description:
            'Get to know more about me! What kind of work I do, what I am passionate about.',
    },
    {
        text: 'Contact',
        href: '/contact',
        external: false,
        id: 'contact',
        flag: false,
        description:
            'Want to work with me or you have other inquiries? Write me a message and I will get back to you as soon as possible.',
    },
    // {
    //     text: 'Blog',
    //     href: '#',
    //     external: false,
    //     id: 'blog',
    //     flag: false,
    //     description: '🚧  My blog is currently under construction. 🚧',
    // },
    {
        text: 'Snake',
        href: '/snakepage',
        external: false,
        id: 'snake',
        flag: false,
        description: 'Remember snake? 🐍',
    },
    {
        text: 'Github',
        href: 'https://github.com/flowreaction',
        external: true,
        id: 'github',
        flag: false,
        description: 'Check out my github profile.',
    },
])

watch(navItems, () => {
    if (rive.value) {
        if (navItems[1].flag) {
            rive.value.happyTrigger()
        }
        if (navItems[2].flag) {
            rive.value.setHappy()
        } else {
            rive.value.resetMouth()
        }
    }
})

const typedTexts = ['Engineer', 'Problem Solver', 'Team Player', 'Coffee Nerd']

const typeWriteOptions: typedTextOptions = {
    loop: true,
    minSpeed: 70,
    maxSpeed: 150,
    delay: 3000,
}

const links = ref()

/**
 * Motion one Animations
 */
// onMounted(() => {
//     animate(
//         '.navlink',
//         { x: -100 },
//         {
//             duration: 1,
//         }
//     )
// })
</script>

<style scoped>
/* * {
    background-color: rgba(255, 255, 255, 0.1);
} */

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.externallink-enter-active,
.externallink-leave-active {
    transition: opacity 0.2s ease-in;
}

.externallink-enter-from,
.externallink-leave-to {
    opacity: 0;
}
</style>
