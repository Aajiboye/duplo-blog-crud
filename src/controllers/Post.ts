import {newPostSchema, pageableSchema, updatePostSchema} from '../validation/schemas'
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost }  from '../services/Post'
import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../lib/logger";
import { update } from 'lodash';


export default async function post (fastify: any ) {

  fastify.route({
    method: "POST",
    url: "/post",
    onRequest: [fastify.authenticate],
    schema: {body: newPostSchema},
    validatorCompiler: ({ schema }: any) => {
      return (data:any) => schema.validate(data);
    },
    handler: async (request: any, reply: FastifyReply) => {
      try {
        request.body.author = request.user
        return reply.code(201).send(await createPost(request.body))
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
    method: "GET",
    url: "/post/:postId",
    onRequest: [fastify.authenticate],
    validatorCompiler: ({ schema }: any) => {
        return (data:any) => schema.validate(data);
      },
    handler: async (request: any, reply: FastifyReply) => {
      try {

        return reply.code(200).send(await getSinglePost(parseInt(request.params.postId)))
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
    method: "GET",
    url: "/posts",
    onRequest: [fastify.authenticate],
    schema: {      
        querystring: pageableSchema,
    },
    validatorCompiler: ({ schema }: any) => {
        return (data:any) => schema.validate(data);
      },
    handler: async (request: any, reply: FastifyReply) => {
      try {
        return reply.code(200).send(await getAllPosts(request.user, request.query))
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
    method: "PUT",
    url: "/post/:postId",
    onRequest: [fastify.authenticate],
    schema: {
        body: updatePostSchema
    },
    validatorCompiler: ({ schema }: any) => {
        return (data:any) => schema.validate(data);
      },
    handler: async (request: any, reply: FastifyReply) => {
      try {

        return reply.code(200).send(await updatePost(parseInt(request.params.postId), request.body))
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
    method: "DELETE",
    url: "/post/:postId",
    onRequest: [fastify.authenticate],
    validatorCompiler: ({ schema }: any) => {
        return (data:any) => schema.validate(data);
      },
    handler: async (request: any, reply: FastifyReply) => {
      try {

        return reply.code(200).send(await deletePost(parseInt(request.params.postId)))
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

