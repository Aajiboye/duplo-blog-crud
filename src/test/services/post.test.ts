import { expect, jest, describe, it, afterEach, beforeAll } from "@jest/globals";
import {createPost, getSinglePost, updatePost, deletePost} from "../../services/Post";
import {USER} from "../fixtures/user.fixture";


describe("Post Service Tests", () => {
   
    afterEach(async () => {
      jest.clearAllMocks();

    });
    let postId: number;
    describe("create POST", () => {
      it("should create new POST successfully", async () => {  
        const newPost = await createPost({
            title: "New Post Title",
            content: "New Post Content",
            author: USER
        });
        postId = newPost.id;
        expect(newPost).toHaveProperty("id");
        expect(newPost).toHaveProperty("createdAt");
        expect(newPost).toHaveProperty("updatedAt");


      });
    });
  
    describe("get a single post by id", () => {
        it("should return validation error when payload is invalid", async () => {  

        const post:any = await getSinglePost(postId)
        expect(post.title).toEqual("New Post Title")
        expect(post.content).toEqual("New Post Content")

        });
      });

      describe("update post", () => {
        it("should update a post by id", async () => {  
    
        const updatedPost: any = await updatePost(postId, {
            title: "Updated Post Title"
        })
        expect(updatedPost.title).toEqual("Updated Post Title")
        });
      });

      describe("delete post", () => {
        it("should delete a post by id", async () => {  
    
        await deletePost(postId)
        expect(await getSinglePost(postId)).toEqual({})
        });
      });
      
  });

  
