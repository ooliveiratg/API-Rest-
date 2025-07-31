import { FastifyInstance } from "fastify"
import { z } from "zod"
import { knex } from "../database"
import {randomUUID} from "node:crypto";
import {checkSessionIdExists} from "../middleware/check-sessionId-exists";



export async function transactionsRoutes(server: FastifyInstance){

    server.get('/', {
        preHandler: [ checkSessionIdExists ]
    },async (request, reply) => {
        const sessionId = request.cookies.session_id

        if(!sessionId){
            return reply.status(401).send({
                error: 'Unauthorized',
                }
            )
        }
        const transactions = await knex('transactions')
            .where('session_id', sessionId)
            .select()
        return {
            transactions
        }
    })

    server.get('/summary', {
        preHandler: [ checkSessionIdExists ]
    }, async (request) => {
        const { sessionId } = request.cookies
        const summary = await  knex('transactions')
            .where('session_id', sessionId)
            .sum('amount', { as: "amount"})
            .first
        return {
            summary
        }
    })

    server.get('/:id', {
        preHandler: [ checkSessionIdExists ]
    }, async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getTransactionParamsSchema.parse(request.params)
        const {sessionId} = request.cookies

        const transaction = await knex('transactions')
            .where({
                session_id: sessionId,
                id
            })
            .first()

        return {
            transaction
        }
    })


    server.post('/', async (request,reply) => {
      const createTransaction = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),

      })
      const {title,type,amount} = createTransaction.parse(request.body)
        let sessionId = request.cookies.session_id

        if(!sessionId){
            sessionId = randomUUID()
            reply.cookie('session_id', sessionId, {
            path: '/',
            maxAge: 60 * 60 *24 * 7, // 7 days
            })
        }
   await knex('transactions').insert({
    id: crypto.randomUUID(),
    title,
    amount: type === 'credit' ? amount : amount * -1,
    session_Id: sessionId
  })

  return reply.status(201).send()
})
}