"use server"
import { revalidatePath } from "next/cache";
import {prisma} from "../lib/db"
import { Prisma } from "@prisma/client";
export async function createPost(formData: FormData) {
    console.log("Creating post...");
  
    const title = formData.get("title") as string; //use the name of the form field
    const slug = title.replace(/\s+/g, "-").toLowerCase();

    console.log(`Slug generated: ${slug}`);
    try {
      await prisma.post.create({
        data: {
          title,
          slug,
          content: formData.get("content") as string,
          author:{
            connect:{
              email:"aman@gmail.com"
            }
          }
        },
      });
    
      console.log("Post created successfully.");
    } catch (error) {
      if( error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.code === "P2002"){
          console.log("Post with this title already exists.")
        }

    }
    revalidatePath("/posts")
  }
  
    
  }

  export async function editPost(formData:FormData, id:string){

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
        content: formData.get("content") as string,
      },
    })
  }
  
  export async function deletePost(formData:FormData, id:string){
    await prisma.post.delete({
      where: {
        id,
      },
    })
  }