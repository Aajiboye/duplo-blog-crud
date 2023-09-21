import Joi from "joi";

const registerUserSchema = Joi.object().keys({
    firstName: Joi.string().max(30).required().meta({
        "string.max": "First name cannot exceed 30 characters",
        "any.required": "First name is required",
      }),
      lastName: Joi.string().max(30).required().meta({
        "string.max": "Last name cannot exceed 30 characters",
        "any.required": "Last name is required",
      }),
      email: Joi.string().email().required().meta({
        "string.email": "Enter a valid email",
        "any.required": "Email is required",
      })
})

const loginUserSchema = Joi.object().keys({
      email: Joi.string().email().required().meta({
        "string.email": "Enter a valid email",
        "any.required": "Email is required",
      })
})

const newPostSchema = Joi.object().keys(
    {
    title: Joi.string().required().meta({
      "any.required": "Title is required",
    }),
    content: Joi.string().required().meta({
        "any.required": "Content is required",
      })
})

const updatePostSchema = Joi.object().keys(
    {
    title: Joi.string(),
    content: Joi.string()
      })

 const singlePostSchema = Joi.object().keys(
    {
    postId: Joi.number().required().meta({
      "any.required": "Title is required",
    })
})


export type Pageable = {
    page: number;
    perPage: number;
  };

  const pageableSchema = Joi.object().keys({
    page: Joi.number().required(),
    perPage: Joi.number().required().max(100).meta({
      "number.max": "Maximum Per Page is 100",
      "any.required": "Per Page is required",
    }),
  });
export {
    registerUserSchema,
    loginUserSchema,
    newPostSchema,
    singlePostSchema,
    pageableSchema,
    updatePostSchema,
}