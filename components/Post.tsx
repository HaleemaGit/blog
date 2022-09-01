import React, { useState } from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import Edit from "../services/editPost";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  description: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const [editing, setEditing] = useState(false);

  const router = useRouter();

  const onDelete = async (data: any) => {
    let toastId;
    toastId = toast.loading("Deleting post....");
    try {
      await axios.delete("/api/post", { data: { data } });
      toast.success("Successfully deleted ", { id: toastId });
    } catch (error) {
      toast.error("Unable to delete your new post", { id: toastId });
    }
    router.push("");
  };

  console.log(post);
  // const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div>
      <Link href={`/p/${post.id}`}>
        <div>
          <h2>{post.title}</h2>
          <ReactMarkdown children={post.description} />
        </div>
      </Link>
      {editing && <Edit post={post} setEditing={setEditing} />}
      {!editing && (
        <button
          type="button"
          className="edit btn btn-success"
          onClick={() => {
            setEditing(true);
          }}
        >
          Edit
        </button>
      )}
      <button
        type="button"
        className="delete btn btn-secondary ml-5 mr-1"
        onClick={() => {
          onDelete(post);
        }}
      >
        Delete
      </button>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
