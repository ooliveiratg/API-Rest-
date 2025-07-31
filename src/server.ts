/* eslint-disable prettier/prettier */
import fastify from 'fastify'
import { transactionsRoutes } from './routes/transaction'
import cookie from '@fastify/cookie'

const server = fastify()
const port = 7777

server.register(cookie)

server.register(transactionsRoutes, {
    prefix: '/transactions',
})


server.listen(
  {
    port,
  },
  
  () => console.log('Server is running on port ' + port),
)
