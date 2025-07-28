/* eslint-disable prettier/prettier */
import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'

const server = fastify()
const port = 7777

server.get('/hello', async () => {
  const transction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Test Transaction',
    amount: 1000,

  }).returning('*') 

  return transction
})

server.listen(
  {
    port,
  },
  
  () => console.log('Server is running on port ' + port),
)
