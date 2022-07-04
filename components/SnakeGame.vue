<template>
    <div class="relative h-full w-full">
        <canvas
            ref="gameboard"
            class="fixed h-full w-full bg-stone-500 dark:bg-neutral-900"
        >
            <!-- :height="wHeight * pixelRatio"
        :width="wWidth * pixelRatio" -->
        </canvas>
        <div class="fixed right-8 top-8 flex flex-col justify-end text-right">
            <span>High-Score: {{ highScore }}</span>
            <span>Score: {{ currentScore }}</span>
        </div>
        <div
            v-if="mobile"
            class="fixed bottom-4 right-1/2 z-50 flex translate-x-[50%] flex-col"
        >
            <div class="flex items-center justify-center">
                <div
                    @click="handleButtonClick(Direction.Up)"
                    class="rotate-180 rounded-full bg-yellow-400 px-6 py-4 text-black opacity-30"
                >
                    v
                </div>
            </div>
            <div class="flex items-center justify-center gap-14">
                <div
                    @click="handleButtonClick(Direction.Left)"
                    class="rounded-full bg-yellow-400 px-6 py-4 text-black opacity-30"
                >
                    &lt
                </div>
                <div
                    @click="handleButtonClick(Direction.Right)"
                    class="rounded-full bg-yellow-400 px-6 py-4 text-black opacity-30"
                >
                    >
                </div>
            </div>
            <div class="flex items-center justify-center">
                <div
                    @click="handleButtonClick(Direction.Down)"
                    class="rounded-full bg-yellow-400 px-6 py-4 text-black opacity-30"
                >
                    v
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Snake, Gameboard, Direction } from '@/composables/useSnake'
import { StorageOptions, useStorage } from '@vueuse/core'

const isDark = inject('isDark')
const gameboard = ref<HTMLCanvasElement>()

const { height: wHeight, width: wWidth } = useWindowSize()
const { pixelRatio } = useDevicePixelRatio()

const mobile = inject('isMobileUA')
watchEffect(() => {
    if (gameboard.value) {
        gameboard.value.height = wHeight.value * pixelRatio.value
        gameboard.value.width = wWidth.value * pixelRatio.value
    }
})

const highScore = useStorage('highScore-storage', 0)
const currentScore = ref(0)

const snake = ref<Snake>()
watchOnce(gameboard, () => {
    snake.value = new Snake(
        new Gameboard(
            gameboard.value.width,
            gameboard.value.height,
            gameboard.value?.getContext('2d'),
            30,
            pixelRatio.value
        ),
        currentScore
    )
})

watch(currentScore, (score) => {
    if (score > highScore.value) {
        highScore.value = score
    }
})

const handleButtonClick = (dir: Direction) => {
    snake.value?.requestDirection(dir)
}

onKeyStroke('ArrowUp', () => {
    snake.value?.requestDirection(Direction.Up)
})

onKeyStroke('ArrowDown', () => {
    snake.value?.requestDirection(Direction.Down)
})
onKeyStroke('ArrowLeft', () => {
    snake.value?.requestDirection(Direction.Left)
})
onKeyStroke('ArrowRight', () => {
    snake.value?.requestDirection(Direction.Right)
})

// const handleKeydown = (direction: Direction) => {
//     // console.debug('handleKeydown', direction)

//     snake.setDirection(direction)
// }
</script>

<style scoped></style>
