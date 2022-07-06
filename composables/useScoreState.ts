interface Score {
    score: number
    name: string
    date: Date
}

type LocalScore = Omit<Score, 'date'>

const backendScores = reactive<Score[]>([])
const localScore = ref<LocalScore>({
    score: 0,
    name: '',
})

const fetchScores = async () => {
    const res = await $fetch('/api/snake/score')
    if (res.error) throw new Error(res.error.message)
    backendScores.length = 0
    console.log(res.data)
    res.data.forEach((entry) => {
        backendScores.push({
            score: entry.score,
            name: entry.name,
            date: new Date(entry.created_at),
        })
    })
}

const topTen = computed(() => {
    return backendScores.sort((a, b) => b.score - a.score).slice(0, 10)
})

const updateScoreInBackend = async () => {
    if (!localScore.value.name) {
        throw new Error('Name is required')
    }

    const data = await $fetch('/api/snake/score', {
        method: 'POST',
        body: localScore.value,
    })
    console.log(data)
    return data
}

export const useScoreState = () => {
    fetchScores()

    function setCurrent(score: number, name?: string) {
        localScore.value.score = score
        if (name) localScore.value.name = name.trim().substring(0, 15)
    }
    const current = readonly(localScore)
    const scoreList = readonly(backendScores)

    return {
        current,
        setCurrent,
        scoreList,
        topTen,
        updateScoreInBackend,
    }
}
