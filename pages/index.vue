<template>
    <div class="flex h-screen flex-col">
        <div
            ref="mainHeader"
            class="mb-4 text-left text-5xl font-semibold text-white dark:text-yellow-500 md:text-6xl lg:text-8xl"
        >
            Florian <br />
            Bopp
        </div>
        <div
            class="my-4 max-w-md select-none rounded-xl bg-neutral-800 p-2 pl-3 text-2xl focus:border-yellow-500 dark:bg-black md:max-w-2xl md:p-4 md:text-4xl lg:text-5xl"
        >
            <span class="mr-2 text-yellow-500">></span>
            <TypeWriter
                :texts="typedTexts"
                caret="_"
                caretColor="yellow"
                :options="typeWriteOptions"
            ></TypeWriter>
        </div>
        <div class="h-1/5"></div>
        <div
            class="flex grow items-center justify-between pb-16 text-end md:mx-16 md:items-start"
        >
            <div class="w-1/2 md:w-1/3">
                <AnimatedHead
                    ref="rive"
                    class="top-0 max-w-xs -translate-x-32 md:max-w-xs md:translate-x-0"
                />
            </div>
            <Transition name="fade" mode="out-in">
                <div
                    class="w-64"
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

            <nav class="flex h-full w-1/2 flex-col justify-between md:w-1/3">
                <div class="flex flex-col">
                    <NuxtLink
                        v-for="item in navItems"
                        ref="links"
                        :key="item.id"
                        @mouseover.native="item.flag = true"
                        @mouseleave.native="item.flag = false"
                        :to="item.href"
                        class="flex-nowrap text-3xl transition-all hover:text-yellow-500 md:text-3xl"
                        :class="{
                            'hover:line-through': item.id === 'blog',
                            'opacity-50': !item.flag && anyHovered,
                        }"
                        >{{ item.text }}</NuxtLink
                    >
                </div>
                <button
                    @click="toggleDark()"
                    class="cursor-sun text-right hover:text-yellow-500"
                    :class="{
                        'cursor-sun ': isDark,
                        'cursor-moon ': !isDark,
                    }"
                >
                    {{ isDark ? 'lighten' : 'darken' }}
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { typedTextOptions } from '~~/composables/useTypedText'

const isMobile = inject('isMobile')
const rive = ref(null)

definePageMeta({
    layout: 'default',
    pageTransition: {
        name: 'swipe-page-left',
        mode: 'out-in',
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
        id: 'about',
        flag: false,
        description:
            'Get to know more about me! What kind of work I do, what I am passionate about.',
    },
    {
        text: 'Contact',
        href: '/contact',
        id: 'contact',
        flag: false,
        description:
            'Want to work with me or you have other inquiries? Write me a message and I will get back to you as soon as possible.',
    },
    {
        text: 'Blog',
        href: '#',
        id: 'blog',
        flag: false,
        description: '🚧  My blog is currently under construction. 🚧',
    },
    {
        text: 'Github',
        href: 'https://github.com/flowreaction',
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
            rive.value.setSad()
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
//Motions
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
