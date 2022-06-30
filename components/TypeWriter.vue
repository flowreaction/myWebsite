<template>
    <span>{{ output }}</span>
    <span :class="caretColorClass, {'animate-none': isAnimating}" class="animate-blink text-amber-400">
        {{ caret }}
    </span>
</template>

<script setup lang="ts">
import { typedTextOptions } from '~~/composables/useTypedText'

interface Props {
    texts: string[]
    caret?: '_' | '|'
    caretColor?:
        | 'red'
        | 'green'
        | 'blue'
        | 'yellow'
        | 'purple'
        | 'cyan'
        | 'white'
        | 'black'
    options?: typedTextOptions
}

const outputSplittedByWord = computed(() => {
    return output.value.split(' ')
})

const props = withDefaults(defineProps<Props>(), {
    caret: '|',
})

const { output, start, stop, isAnimating } = useTypedText(props.texts, {
    ...props.options,
})

const caretColorClass = computed(() => {
    switch (props.caretColor) {
        case 'red':
            return { 'text-red-500': true }
        case 'green':
            return { 'text-green-500': true }
        case 'blue':
            return { 'text-blue-500': true }
        case 'yellow':
            return { 'text-yellow-500': true }
        case 'purple':
            return { 'text-purple-500': true }
        case 'cyan':
            return { 'text-cyan-500': true }
        case 'white':
            return { 'text-white': true }
        case 'black':
            return { 'text-black': true }
        default:
            return { '': true }
    }
})

onMounted(() => {
    nextTick(() => {
        start()
    })
})
onUnmounted(() => {
    stop()
})
</script>

<style scoped></style>
