import { FastifyRequest, FastifyReply } from 'fastify';


export async function  checkSessionIdExists(request:FastifyRequest, reply:FastifyReply) {
    const sessionId = request.cookies.session_id;

    if (!sessionId) {
        return reply.status(401).send({
            error: 'Unauthorized',
        });
    }

}