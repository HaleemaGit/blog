import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { getPosts } from "../services/post";
import BlogForm from "../services/blogForm";
// import Login from "../components/Login";
import NavBar from "../components/NavBar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useSession, signOut } from "next-auth/react";
import * as Icon from "react-bootstrap-icons";


type Props = {
  data: PostProps[];
};

export const getStaticProps: GetStaticProps = async () => {
  console.log("We're HERE");
  const data = await getPosts();
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: 10,
  };
};

const Blog: React.FC<Props> = (props: any) => {

  const { data: session, status } = useSession();
  console.log("session", session);

  const user = session?.user;
  const isLoadingUser = status === "loading";
  
  console.log("props", props.data);
  //  if({error}){
  //    return <h1>Error retrieving post</h1>
  //  }
  return (
    <Layout>
       <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.data.map((post: any) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      {user ? 
        (
          <div>
            <p>{user?.email}</p>
            <div>{user?.image}</div>
            <button onClick={() => signOut()} className="btn mb-3 mt-2 border border-secondary">
              <Icon.Google size={30} color={"red"} className="px-2 mb-3 mt-2" />
              signOut
            </button>
          </div>
        ):(
      
          <NavBar />)}
      <BlogForm />
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;

// function setShowModal(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
