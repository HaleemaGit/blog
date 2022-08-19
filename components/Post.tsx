import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  description:string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  console.log(post)
  // const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Link href={`/p/${post.id}`}>
      <div>
      <h2>{post.title}</h2>
      {/* <small>By {authorName}</small> */}
      <ReactMarkdown children={post.description} />
      <button type="button" className="btn btn-danger mr-1">
          Delete
        </button>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
      </div>
     
    </Link>
  );
};

export default Post;