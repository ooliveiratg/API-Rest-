import 'dotenv/config'
import { Database } from 'sqlite3'
import { z } from 'zod'
//validação do processo de env usando zod
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
})

export const env = envSchema.safeParse(process.env)

if(env.success === false){
    console.error('Invalid environment variables', env.error.format())

}



