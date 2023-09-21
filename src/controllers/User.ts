import {registerUserSchema, loginUserSchema} from '../validation/schemas'
import {RegisterUserDto, SignInDto, SignInResponseDto} from '../dtos/UserDtos'
import { registerUser, signIn }  from '../services/User'
import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../lib/logger";


export default async function user (fastify: any ) {

  fastify.route({
    method: "POST",
    url: "/register",
    schema: {body: registerUserSchema},
    validatorCompiler: ({ schema }: any) => {
      return (data:any) => schema.validate(data);
    },
    handler: async (request:FastifyRequest<{
      Body: RegisterUserDto;
    }>, reply: FastifyReply) => {
      try {
        return reply.code(201).send(await registerUser(request.body))
      } catch (error) {
        logger.error(error);
        let e;
        if (typeof error === "string") {
          e= error.toUpperCase() // works, `e` narrowed to string
      } else if (error instanceof Error) {
          e = error.message // works, `e` narrowed to Error
      }
        reply.code(400).send({
        message: e,
    });
      }
      
    }
})

fastify.route({
  method: "POST",
  url: "/login",
  schema: {body: loginUserSchema},
  validatorCompiler: ({ schema }: any) => {
    return (data:any) => schema.validate(data);
  },
  handler: async (request:FastifyRequest<{
    Body: SignInDto;
  }>, reply: FastifyReply) => {
    try {
      const signInResponse: SignInResponseDto = await signIn(request.body);
      signInResponse.token = fastify.jwt.sign(signInResponse)
      return reply.code(200).send(signInResponse)
    } catch (error) {
      logger.error(error);
      let e;
      if (typeof error === "string") {
        e= error.toUpperCase() // works, `e` narrowed to string
    } else if (error instanceof Error) {
        e = error.message // works, `e` narrowed to Error
    }
      reply.code(400).send({
      message: e,
  });
    }
    
  }
})
}

