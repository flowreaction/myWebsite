<template>
    <canvas
        @click="clickHandler"
        ref="canvas"
        :width="1000"
        :height="1000"
    ></canvas>
</template>

<script setup lang="ts">
import { Rive } from '@rive-app/canvas-single'

const src =
    'https://public.rive.app/community/runtime-files/2396-5883-animated-head.riv'
const canvas = ref(null) // reference to canvas element
const riveInstance = ref(null)
const riveInputs = {
    isHappy: null,
    isSad: null,
    agree: null,
    disagree: null,
    x: null,
    y: null,
}
const clickcounter = ref(0)
const mouse = useMouse({ touch: false })
const canvasPosition = useElementBounding(canvas)
const canvasCenter = computed(() => {
    return {
        x: canvasPosition.left.value + canvasPosition.width.value / 2,
        y: canvasPosition.top.value + canvasPosition.height.value / 2,
    }
})

watch([mouse.x, mouse.y], ([newX, newY]) => {
    //   console.log(`x: ${newX} y: ${newY}`)
    if (canvas.value) {
        riveInputs.y.value = newY - canvasCenter.value.y
        riveInputs.x.value = newX - canvasCenter.value.x
    }
})

onMounted(() => {
    riveInstance.value = newRive()
    console.log(canvasPosition)
})

onBeforeUpdate(() => {
    riveInputs.x.value = 50
})

const clickHandler = () => {
    console.log('click')
    switch (clickcounter.value) {
        case 0:
            riveInputs.isHappy.value = true
            riveInputs.agree.fire()
            break
        case 1:
            riveInputs.isHappy.value = false
            riveInputs.isSad.value = true
            riveInputs.disagree.fire()
            break
        default:
            break
    }
    setTimeout(() => {
        riveInputs.isHappy.value = false
        riveInputs.isSad.value = false
    }, 2000)
    clickcounter.value = (clickcounter.value + 1) % 2
}

const resetAnimation = () => {
    setTimeout(() => {
        riveInputs.isHappy.value = false
        riveInputs.isSad.value = false
    }, 2000)
}

const sadTrigger = () => {
    riveInputs.isSad.value = true
    riveInputs.disagree.fire()
    resetAnimation
}
const happyTrigger = () => {
    riveInputs.isHappy.value = true
    riveInputs.agree.fire()
    resetAnimation()
}

defineExpose({
    sadTrigger,
    happyTrigger,
})

const newRive = () => {
    const riveInstance = new Rive({
        canvas: canvas.value,
        src: src,
        // layout: new Layout({
        //     fit: Fit.Fill,
        //     alignment: Alignment.TopLeft,
        // }),
        autoplay: true,
        // animations: 'idlePreview',
        stateMachines: 'default',
        onLoad: (_) => {
            const inputs = riveInstance.stateMachineInputs('default')
            riveInputs.isHappy = inputs.find((i) => i.name === 'isHappy')
            riveInputs.isSad = inputs.find((i) => i.name === 'isSad')
            riveInputs.agree = inputs.find((i) => i.name === 'agree')
            riveInputs.disagree = inputs.find((i) => i.name === 'disagree')
            riveInputs.x = inputs.find((i) => i.name === 'x')
            riveInputs.y = inputs.find((i) => i.name === 'y')
            riveInputs.x.value = 50
            riveInputs.y.value = 50
        },
    })
    return riveInstance
}
</script>
