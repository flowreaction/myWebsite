import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = serverSupabaseClient(event)
    const { data, error, status } = await client
        .from('snake')
        .select('name, created_at, score')
        .limit(15)
        .order('score', {
            ascending: false,
        })
    return {
        data,
        error,
        status,
    }
})
