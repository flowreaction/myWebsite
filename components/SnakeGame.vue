<template>
    <div>
        <canvas
            tabindex="0"
            ref="gameboard"
            class="fixed h-full w-full bg-neutral-500 dark:bg-neutral-900"
        >
            <!-- :height="wHeight * pixelRatio"
        :width="wWidth * pixelRatio" -->
        </canvas>
    </div>
</template>

<script setup lang="ts">
import { Snake, Gameboard, Direction } from '@/composables/useSnake'

const gameboard = ref<HTMLCanvasElement>()

const { height: wHeight, width: wWidth } = useWindowSize()
const { pixelRatio } = useDevicePixelRatio()

watchEffect(() => {
    if (gameboard.value) {
        gameboard.value.height = wHeight.value * pixelRatio.value
        gameboard.value.width = wWidth.value * pixelRatio.value
    }
})

let snake: Snake = null
watchOnce(gameboard, () => {
    snake = new Snake(
        new Gameboard(
            gameboard.value.width,
            gameboard.value.height,
            gameboard.value?.getContext('2d'),
            30,
            pixelRatio.value
        )
    )
})

// onKeyStroke('ArrowUp', () => {
//     snake?.setDirection(Direction.Up)
// })

// onKeyStroke('ArrowDown', () => {
//     snake?.setDirection(Direction.Down)
// })
// onKeyStroke('ArrowLeft', () => {
//     snake?.setDirection(Direction.Left)
// })
// onKeyStroke('ArrowRight', () => {
//     snake?.setDirection(Direction.Right)
// })

// const handleKeydown = (direction: Direction) => {
//     // console.debug('handleKeydown', direction)

//     snake.setDirection(direction)
// }
</script>

<style scoped></style>
