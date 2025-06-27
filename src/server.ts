import fastify from "fastify";

const server = fastify()
const port = 7777

server.listen({
    port: port
}, () => console.log('Server is running on port ' + port))