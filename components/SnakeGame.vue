<template>
    <div class="relative h-full w-full">
        <canvas
            ref="gameboard"
            class="fixed h-full w-full bg-stone-500 dark:bg-neutral-900"
        >
        </canvas>
        <div
            v-if="gameover"
            class="fixed inset-x-0 inset-y-0 z-50 m-auto flex h-5/6 w-3/4 max-w-5xl flex-col rounded-xl border-4 border-yellow-500 bg-black p-4 text-white md:h-3/4 md:w-1/2"
        >
            <h1
                class="mb-6 flex-none text-center text-4xl text-yellow-500 md:text-6xl"
            >
                Game Over
            </h1>
            <section class="grow overflow-y-hidden">
                <h2 class="mb-4 text-center text-3xl">Top Scores</h2>
                <div class="flex justify-around text-2xl">
                    <span>Name:</span> <span>Score:</span>
                </div>
                <div class="h-full overflow-y-hidden">
                    <ul>
                        <li
                            v-for="(entry, indx) in topTen"
                            :key="entry.date.toString"
                            class="flex justify-around truncate first:text-yellow-500 odd:bg-neutral-900"
                        >
                            <div
                                class="flex w-1/2 items-center justify-start px-1"
                            >
                                <span v-if="indx === 0" class="pr-1">👑</span>
                                <span class="truncate text-left"
                                    >{{ entry.name }}
                                </span>
                            </div>
                            <span class="w-1/2 truncate px-1 text-right">{{
                                entry.score
                            }}</span>
                        </li>
                    </ul>
                </div>
            </section>
            <section
                class="inset-x-0 bottom-0 flex flex-none flex-col justify-end gap-2 bg-black py-2"
            >
                <div class="flex flex-col items-center justify-start px-2">
                    <p>Your score: {{ currentScore }}</p>
                    <!-- <label for="name">Your Name</label> -->
                    <input
                        v-model="playername"
                        required
                        type="text"
                        name="name"
                        id="name"
                        placeholder="your name here"
                        class="my-1 block h-14 w-full rounded border-0 border-b-2 border-black bg-neutral-900 px-2 text-center focus:border-yellow-500 focus:ring-0"
                    />
                </div>
                <div class="flex justify-around">
                    <button
                        @click="restart()"
                        class="w-5/12 rounded-lg bg-neutral-900 p-4 text-white"
                    >
                        Restart
                    </button>
                    <button
                        @click="exit()"
                        class="w-5/12 rounded-lg bg-neutral-900 p-4 text-white"
                    >
                        Exit
                    </button>
                </div>
            </section>
        </div>
        <div class="fixed right-8 top-8 flex flex-col justify-end text-right">
            <span>High-Score: {{ highScore }}</span>
            <span>Score: {{ currentScore }}</span>
        </div>
        <div
            v-if="mobile && gamestate !== 'gameover'"
            class="fixed bottom-4 right-1/2 z-50 flex translate-x-[50%] flex-col"
        >
            <div class="flex items-center justify-center">
                <div
                    @click="handleButtonClick(Direction.Up)"
                    class="rotate-180 rounded-full bg-yellow-400 px-8 py-6 text-black opacity-30"
                >
                    v
                </div>
            </div>
            <div class="flex items-center justify-center gap-14">
                <div
                    @click="handleButtonClick(Direction.Left)"
                    class="rounded-full bg-yellow-400 px-8 py-6 text-black opacity-30"
                >
                    &lt
                </div>
                <div
                    @click="handleButtonClick(Direction.Right)"
                    class="rounded-full bg-yellow-400 px-8 py-6 text-black opacity-30"
                >
                    >
                </div>
            </div>
            <div class="flex items-center justify-center">
                <div
                    @click="handleButtonClick(Direction.Down)"
                    class="rounded-full bg-yellow-400 px-8 py-6 text-black opacity-30"
                >
                    v
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Snake, Gameboard, Direction } from '@/composables/useSnake'

const { height: wHeight, width: wWidth } = useWindowSize()
const { pixelRatio } = useDevicePixelRatio()
const mobile = inject('isMobileUA')

//template ref to canvas
const gameboard = ref<HTMLCanvasElement>()

type GameState = 'playing' | 'paused' | 'gameover'
const gamestate = ref<GameState>()

//declare and initialize the snake
const snake = ref<Snake>()

watchOnce(gameboard, () => {
    if (gameboard.value) {
        gameboard.value.height = wHeight.value * pixelRatio.value
        gameboard.value.width = wWidth.value * pixelRatio.value
        snake.value = new Snake(
            new Gameboard(
                gameboard.value.width,
                gameboard.value.height,
                gameboard.value?.getContext('2d'),
                30,
                pixelRatio.value
            ),
            currentScore,
            gamestate
        )
    }
})
watchEffect(() => {
    if (gameboard.value) {
        gameboard.value.height = wHeight.value * pixelRatio.value
        gameboard.value.width = wWidth.value * pixelRatio.value
    }
})
//handling scoring system
const { current, scoreList, setCurrent, topTen, updateScoreInBackend } =
    useScoreState()
const playername = ref<string>()

const currentScore = ref(0)
watch(currentScore, (newScore) => {
    setCurrent(newScore)
})

const highScore = computed(() => {
    if (topTen.value) return topTen.value[0]?.score
    else return 0
})

const restart = () => {
    // console.log('restart')
    // gamestate.value = 'playing'
    // snake.value.restart()
    const router = useRouter()
    if (playername.value) {
        setCurrent(currentScore.value, playername.value)
        updateScoreInBackend()
    }
    router.go(0)
}

const exit = () => {
    console.log('exit')
    if (playername.value) {
        setCurrent(currentScore.value, playername.value)
        updateScoreInBackend()
    }
    navigateTo('/')
}

const gameover = ref(false)

watch(gamestate, (newState) => {
    if (newState === 'gameover') {
        gameover.value = true
    } else {
        gameover.value = false
    }
})

//Handling snake controls
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
</script>

<style scoped></style>
