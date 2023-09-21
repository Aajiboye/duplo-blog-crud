# Duplo Blog App!

This is a nodeJs application developed using **Fastify framework, Prisma ORM and Typescript**. Unit test was written with **Jest**.



# System Dependencies

- Node Version >16.0
- PostGres 14.4

## Design Considerations

The task requires that a blog management service is created that has the following feature:
- Create a new blog post with a title, content, and author.
- Retrieve a list of all blog posts.
- Retrieve a single blog post by its ID.
- Update a blog post.
- Delete a blog post by its ID.
- Implement pagination for listing blog posts.

In order to achieve item 1 above, it requires that a simple User management service is included which facilitates authentication, hence, post routes can only be assessed by authenticated users.

### Authetication Strategy
JWT using fastify-jwt library

### Choice of folder structure
The structure of the project folder is such that facilitates separation of concerns and ensures domains are not tightly coupled. This is evident in the ease of writing unit tests for individual component.

## How to get started

- Clone this repository
- Run ```npm install```to install project dependencies.
- Create a .env file on the root directory to comply with the already defined fields in the env-sample file
- Start the server using ```npm run dev```

## Running test

You can run the test suits by running ```npm run test```

## API Docs
https://documenter.getpostman.com/view/8640133/2s9YCBsUdt
