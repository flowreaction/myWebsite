<template>
    <div class="fixed h-screen w-screen p-0">
        <div
            class="fixed top-8 left-8 z-50 flex w-full items-start justify-start"
        >
            <NuxtLink
                to="/"
                class="flex items-center justify-between gap-3 text-2xl hover:text-yellow-500 md:text-inherit"
            >
                <ArrowLeft /> Back
            </NuxtLink>
        </div>
        <SnakeGame />
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
