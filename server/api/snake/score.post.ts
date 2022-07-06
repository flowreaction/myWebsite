import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = serverSupabaseClient(event)
    const body = await useBody(event)
    const { data, error, status } = await client.from('snake').insert([
        {
            name: body.name.trim().substring(0, 15),
            score: body.score,
        },
    ])

    return {
        data,
        error,
        status,
    }
})
