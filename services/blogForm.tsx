import axios from "axios";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router'

type FormData = {
  title: string;
  description: string;
};


export default function BlogForm() {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const onSubmit = async (data) => {
    let toastId;
    toastId = toast.loading("Submitting post....")
    try {
      await axios.post('/api/post', data);
      toast.success("Successfully posted", { id: toastId })
      reset()
    } catch (error) {
      toast.error("Unable to submit your new post", { id: toastId })
    }
    router.push("");
  }
  // title and content will have correct type

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input {...register("title")} />
      <label>Description</label>
      <input {...register("description")} />
      <div className="form-group">
        <button type="submit" className="btn btn-primary mr-1">
          Post
        </button>
        {/* <button type="button" onClick={() => reset()} className="btn btn-secondary">
          Reset
        </button> */}
      </div>
    </form>
  );
}
