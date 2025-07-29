import { FastifyInstance } from "fastify"
import { z } from "zod"
import { knex } from "../database"

export async function transactionsRoutes(server: FastifyInstance){
    server.post('/', async (request,reply) => {
      const createTransaction = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),

      })
      const {title,type,amount} = createTransaction.parse(request.body)
  })
   await knex('transactions').insert({
    id: crypto.randomUUID(),
    title,
    amount: type === 'credit' ? amount : amount * -1,
  })

  return reply.status(201).send()
})
}