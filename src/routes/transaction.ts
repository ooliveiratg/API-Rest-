import { FastifyInstance } from "fastify"
import { knex } from "../database"

export async function transactionsRoutes(server: FastifyInstance){
    server.get('/hello', async () => {
  const transction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Test Transaction',
    amount: 1000,

  }).returning('*') 

  return transction
})
}