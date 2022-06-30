import { Ref } from 'vue'

export interface typedTextOptions {
    /**
     * The minimum speed of the typing animation in ms. Defaults to 50ms.
     */
    minSpeed?: number
    /**
     * The maximum speed of the typing animation in ms. Defaults to 100ms.
     */
    maxSpeed?: number
    /**
     * The delay betweeen texts in ms. Defaults to 2000ms.
     */
    delay?: number
    /**
     * If set to true the animation will loop. Defaults to false.
     */
    loop?: boolean
    /**
     * If set to true the text will be deleted word by word. after the animation is finished. Defaults to false.
     */
    // reverse?: boolean
}

function* iterableText(text: string) {
    for (let i = 0; i < text.length; i++) {
        yield text[i]
    }
}

function randBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const useTypedText = (
    texts: string[] | Ref<string[]>,
    options?: typedTextOptions
): {
    /**
     * the current text to be displayed
     */
    output: Ref<string>
    /**
     * Stops the typing animation.
     */
    stop: () => void
    /**
     * Starts the typing animation.
     */
    start: () => void
    /**
     * True while animation is running.
     */
    isAnimating: Ref<boolean>
} => {
    const output = ref('')
    const minSpeed = options.minSpeed || 50
    const maxSpeed = options.maxSpeed || 100
    const delay = options.delay || 2000
    const loop = options.loop || false
    // const reverse = options.reverse || false

    const textsArray = unref(texts)
    const stopped = ref(false)
    const isAnimating = ref(false)

    const textsLength = textsArray.length

    let arrayOfIterators: IterableIterator<string>[] = []

    const run = (i?: number) => {
        const textsIndex = i || 0

        const nextChar = arrayOfIterators[textsIndex].next()

        if (stopped.value) {
            output.value = ''
            isAnimating.value = false
            return
        }
        if (nextChar.done) {
            // if (reverse) {
            //     const completeText = output.value
            //     const arrayOfWords = completeText.split(' ')
            //     setTimeout(() => {
            //         arrayOfWords.pop()
            //         output.value = arrayOfWords.join(' ')
            //     }, 200)
            // }
            isAnimating.value = false
            if (textsIndex + 1 < textsLength) {
                setTimeout(() => {
                    output.value = ''
                    run(textsIndex + 1)
                }, delay)
            } else if (loop) {
                setTimeout(() => {
                    start()
                }, delay)
            } else {
                return
            }
        } else {
            const charDelay = randBetween(minSpeed, maxSpeed)
            isAnimating.value = true
            output.value += nextChar.value
            setTimeout(() => {
                run(textsIndex)
            }, charDelay)
        }
    }

    const start = () => {
        arrayOfIterators = textsArray.map((text) => iterableText(text))
        stopped.value = false
        output.value = ''
        run()
    }

    /**
     * Stops the typing animation.
     */
    const stop = () => {
        stopped.value = true
    }

    return {
        output,
        stop,
        start,
        isAnimating,
    }
}
