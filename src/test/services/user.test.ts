import { expect, jest, describe, it, afterEach, beforeAll } from "@jest/globals";
import {registerUser, signIn} from "../../services/User";
import prisma from '../../lib/prisma';


describe("User Service Tests", () => {
    beforeAll(async ()=>{
        try {
            await prisma.user.delete({
                where: {
                    email: "siracube@gmail.com"
                }
            }) 
        } catch (error) {
            
        }
        
    })
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe("create user", () => {
      it("should create new user successfully", async () => {  
        const newUser = await registerUser({
            firstName: "abraham",
            lastName: "ajiboye",
            email: "siracube@gmail.com"
        });
  
        expect(newUser).toHaveProperty("id");
        expect(newUser).toHaveProperty("createdAt");
        expect(newUser).toHaveProperty("updatedAt");


      });
    });
  
    describe("return validation error", () => {
        it("should return validation error when payload is invalid", async () => {  
    try{
        await registerUser({
            firstName: "abraham",
            lastName: "ajiboye",
            email: "abrahamajiboye"
        })
    }catch(err){
        expect(err).toBeInstanceOf(Error);
    }
        });
      });

      describe("sign in user", () => {
        it("should return a token on successful sign in", async () => {  
    
        const signInUser = await signIn({
            email: "siracube@gmail.com"
        })
        expect(signInUser.token).toBeDefined
        });
      });
  });

  
