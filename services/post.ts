// function for creating, deleting and updating (using id of post) here
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface result {
  error:boolean;
  data:string
}

interface feed {
  name:string
  post: string
  author: string
}

type Post={
  id:string
}

const result : string[] = [];

export const getPosts = async () => {
 let result = {error:false, data:[]}
 
  const feed = await prisma.post.findMany()
  
  console.log("----------------------------")
  console.log(feed)
  return feed
}

export const getPost = async (id:string) => {
  
   const feed = await prisma.post.findUnique({
    where: {
      id: id,
    },
   })
   console.log("----------------------------")
   console.log(feed)
   return feed
 }


 