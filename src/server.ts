/* eslint-disable prettier/prettier */
import fastify from 'fastify'
import { knex } from './database'

const server = fastify()
const port = 7777

server.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

server.listen(
  {
    port,
  },
  
  () => console.log('Server is running on port ' + port),
)
