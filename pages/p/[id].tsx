import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import { PrismaClient } from "@prisma/client";
import { getPost } from "../../services/post";


const prisma = new PrismaClient();



// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const post = await getPost(String(params?.id));
//   return {
//     props: post,
//   };
// };


// async function deletePost(id: string): Promise<void> {
//   await fetch(`/api/post/${id}`, {
//     method: "DELETE",
//   });
//   await Router.push("/")
// }


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   const post =  await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
   });
  //   id: "1",
  //   title: "Prisma is the perfect ORM for Next.js",
  //   content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
  //   published: false,
  //   author: {
  //     name: "Nikolas Burk",
  //     email: "burk@prisma.io",
  //   },
  // }
  return {
    props:{
      post:JSON.parse(JSON.stringify(post)),
    } 
  }
}



const Post: React.FC<PostProps> = (props) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        {/* <p>By {props?.author?.name || "Unknown author"}</p> */}
        <ReactMarkdown children={props.description} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
