import { User } from '@prisma/client';
import {PostRequestDto, PostUpdateDto} from '../dtos/PostDtos'
import prisma from '../lib/prisma';
import { Pageable } from '../validation/schemas';



export async function createPost(post: PostRequestDto) {
    const newPost = await prisma.post.create({
        data: {
            title: post.title,
            content: post.content,
            author: { connect: { email: post.author?.email } }
          }
    }
        
    )
return newPost;
    }

    export async function getSinglePost(postId: number) {
        const getPost = await prisma.post.findUnique({
            where: {
                id: postId
            },
            select: {
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                author: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
        })
            
    return getPost||{};
        }

        export async function getAllPosts(author: User, pageable: Pageable ) {
            const getPosts = await prisma.post.findMany({
                    skip: pageable.page - 1,
                    take: pageable.perPage * 1,
                    where: {
                        authorId: author.id
                    },
                    select: {
                        title: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true,
                        author: {
                          select: {
                            firstName: true,
                            lastName: true,
                          },
                        },
                      },
                    })
                
        return getPosts;
            }

            export async function updatePost(postId: number, postUpdatePayload: PostUpdateDto ) {
                const updatedPost = await prisma.post.update({
                        where: {
                            id: Number(postId)
                        },
                        data: postUpdatePayload
                })
                    
            return updatedPost;
                }

                export async function deletePost(postId: number) {
                const post = await prisma.post.delete({
                            where: {
                                id: Number(postId)
                            }
                    })
                        
                return post;
                    }
