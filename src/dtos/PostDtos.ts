import { User } from "@prisma/client"

interface PostRequestDto {
    title: string,
    content: string,
    author?: User
}

interface PostUpdateDto {
    title?: string,
    content?: string,
}


export {
    PostRequestDto,
    PostUpdateDto
}