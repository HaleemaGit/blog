import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { getPosts } from "../services/post";
import BlogForm from "../services/blogForm";
import Login from "../components/Login";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';

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
  // const[showModal, setShowModal] = useState(false);

  // const OnLogin = () => {
  //   setShow(true);
  // };
  console.log("props", props.data);
  //  if({error}){
  //    return <h1>Error retrieving post</h1>
  //  }
  return (
    <Layout>
      {/* <Button onClick={OnLogin}>Login Here</Button> */}
      <Login />
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
