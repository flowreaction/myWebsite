<template>
    <!--  -->
    <div class="flex w-fit flex-col-reverse items-center justify-center gap-4">
        <div v-for="pic in gallery" class="p-4">
            <img
                :src="pic.href"
                :alt="pic.alt"
                class="h-12 transition-all hover:scale-[130%]"
                :title="pic.alt.split(' ')[1]"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const Logos = import.meta.glob('@/assets/logos/*.svg')

interface LogoURL extends URL {
    alt?: string
}

const gallery = ref<LogoURL[]>([])

for (const logo in Logos) {
    Logos[logo]().then(() => {
        const p = new URL(logo, import.meta.url)
        const myP: LogoURL = p
        //creating the Alt text from filename
        myP.alt = p.href
            .split('/')
            .pop()
            .split('.')[0]
            .replace('Logos', 'Logo ')
        gallery.value.push(myP)
    })
}
</script>

<style scoped></style>
