
import fp from "fastify-plugin";
import {fastifyJwt} from '@fastify/jwt'
import { APP_JWT_SECRET } from '../config';
import { FastifyInstance } from 'fastify'


module.exports = fp(async function (fastify: FastifyInstance) {

    fastify.register(fastifyJwt, {
        secret: APP_JWT_SECRET
    })

    fastify.decorate("authenticate", async function (request: any, reply: any) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })

})