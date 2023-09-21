require("dotenv").config();

import {
  expect,
  jest,
  describe,
  it,
  afterEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import path from "path";
import AutoLoad from "@fastify/autoload";
import { FastifyInstance } from "fastify";

describe("server", () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = require("fastify")();
    await fastify.register(AutoLoad, {
      dir: path.join(__dirname, "../plugins"),
    });
    await fastify.register(AutoLoad, {
      dir: path.join(__dirname, "../controllers"),
    });
    await fastify.listen({
      port: Number(process.env.PORT),
      host: "localhost",
    });
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("should start the server without errors", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/",
    });
    expect(response.statusCode).toEqual(404);
  });
});
