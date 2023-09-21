import {RegisterUserDto, SignInDto, SignInResponseDto} from '../dtos/UserDtos'
import prisma from '../lib/prisma';



export async function registerUser(user: RegisterUserDto) {
    const existingUser = await prisma.user.findUnique(
        { 
            where:
            {
            email: user.email
        }}
    )

    if(existingUser) throw new Error("User already exists");
    const newUser = await prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      })
      return newUser
    }

    export async function signIn(payload: SignInDto):Promise<SignInResponseDto> {
      const user = await prisma.user.findUnique(
          { 
              where:
              {
              email: payload.email
          }}
      )
  
      if(!user) throw new Error("User does not exists");

        return user
      }