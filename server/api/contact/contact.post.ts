import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = serverSupabaseClient(event)
    const body = await useBody(event)
    console.log(body)
    const { data, error, status } = await client.from('contact').insert([
        {
            name: body.name,
            email: body.email,
            message: body.message.trim(),
        },
    ])

    return {
        data,
        error,
        status,
    }
})
