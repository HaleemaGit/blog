import * as React from "react";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";

type FormData = {
  title: string;
  description: string;
  id: string;
};

export default function Edit(props: any) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>(props.post);

  useEffect(() => {
    reset(props.post);
  }, []);

  const onSubmit = async (data: any) => {
    let toastId;
    toastId = toast.loading("Editing post....");
    try {
      await axios.patch("/api/post", data);
      toast.success("Successfully edited", { id: toastId });
    } catch (error) {
      toast.error("Unable to submit your new post", { id: toastId });
    }
    router.push("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input {...register("title")} />
      <label>Description</label>
      <input {...register("description")} />
      <div className="form-group">
        <button type="submit" className="btn btn-primary mr-1">
          Save Changes
        </button>
        {/* <button type="button" onClick={() => reset()} className="btn btn-secondary">
      Reset
    </button> */}
      </div>
    </form>
  );
}
