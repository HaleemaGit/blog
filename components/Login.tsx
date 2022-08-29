import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from "next/image";

interface IFormInputs {
  email: string;
  password: string;
}
interface IUser {
  lastName?: string;
  firstName?:string;
  middleName?:string;
}


const schema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string()
    .required("Password is mandatory")
    .min(8, "Password must be at least 8 char long")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
      "Password must contain UPPERCASE, LOWERCASE and NUMBER, at least 8 charactersPassword must contain UPPERCASE, LOWERCASE and NUMBER, at least 8 characters"
    ),
});

function Login() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const nameArray = user?.name?.split(" ");
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });

  const onSubmit = (data: IFormInputs) => {
    alert(JSON.stringify(data));
    console.log("clicked");
  }; // your form submit function which will invoke after successful validation


  return (
    <div>
      <div className="popup-tabs-container">
        <div className="popup-tab-content" id="login">
          <form onSubmit={handleSubmit(onSubmit)} id="login-account-form">
            <div className="d-flex flex-row align-items-center mb-4 px-5 ml-1 mt-2">
              <Icon.Envelope size={30} className="px-2 mb-2 mt-3" />
              <div className="form-outline flex-fill mb-2 mt-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  id="form3Example3c"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                />
                {errors.email && (
                  <p className="error">
                    Hint: Please insert a valid email to login successfully!
                  </p>
                )}
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4 px-5 ml-1">
              <Icon.LockFill size={30} className="px-2 mb-2 mt-2" />
              <div className="form-outline flex-fill mb-2 mt-2">
                <input
                  type="password"
                  id="form3Example4c"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                  })}
                  className={`form-control ${errors.password ? "is-invalid" : ""
                    }`}
                />
                {errors.password && (
                  <p className="error">
                    Please insert a valid password for this account!
                  </p>
                )}
              </div>
            </div>

            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
            <div className="row">
              <div className="col text-center">
                <Button
                  className="btn btn-primary col-12 active"
                  type="submit"
                  form="login-account-form"
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col text-center mt-3">
        <span>or</span>
      </div>
      {(status == "unauthenticated") ?
        (<div className="col text-center">
          <button onClick={() => signIn('google')} className="btn mb-3 mt-2 border border-secondary">
            <Icon.Google size={30} color={"red"} className="px-2 mb-3 mt-2" />
            Login via Google+
          </button>
        </div>) : (
          <div>
            <p>{user?.name}</p>

            <div><Image width={30} height={30} src={user?.image} />  </div>
            <button onClick={() => signOut()} className="btn mb-3 mt-2 border border-secondary">
              <Icon.Google size={30} color={"red"} className="px-2 mb-3 mt-2" />
              signOut
            </button>
          </div>
        )
      }
    </div>
  );
}

export default Login;
