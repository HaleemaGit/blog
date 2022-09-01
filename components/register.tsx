
import * as Icon from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button } from "react-bootstrap";
import React, { useState, useId } from "react";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { SubmitHandler} from "react-hook-form";
import { hashPassword } from "../lib/bcrypt";
import Image from "next/image";
import { toast } from "react-hot-toast";
import axios from "axios";

interface ISignUpInputs {
  email: string;
  password: string;
  passwordConfirm: string;
  options: string;
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

  passwordConfirm: Yup.string()
    .required("Password is mandatory")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

function Register(props: any) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpInputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });

  // const onSubmit = (data: IFormInputs) => {
  //   alert(JSON.stringify(data));
  //   console.log("clicked");
  // }; // your form submit function which will invoke after successful validation

  const createAccountHandler = async (data: ISignUpInputs) => {
    const response = axios.post("/api/auth/user/signup", {
      // name: data.name,
      email: data.email,
      password: data.password,
      options: data.options,
    });
    return response;
  };

  const onSubmit = async (data: ISignUpInputs) => {
    setSubmitting(true);
    try {
      createAccountHandler(data)
        .then((response) => {
          signIn("signin", {
            callbackUrl: "/",
            email: data.email,
            password: data.password,
          });
        })
        .catch((error) => {});
      setTimeout(() => {
        setSubmitting(false);
      }, 850);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  const signUpWithGoogle = () => {
    // TODO: Perform Google auth
    toast.loading("Redirecting...");
    setDisabled(true);
    // Perform sign up
    signIn("google", {
      callbackUrl: window.location.href,
    });
  };


  const { open, setLoginOpen, setSignupOpen } = props;

  const switchLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };
  return (
    <div>
      <div className="popup-tabs-container">
        <div className="popup-tab-content" id="register">
          <div className="welcome-text">
            <h3 className="container text-center mt-2">
              LET'S CREATE YOUR ACCOUNT!
            </h3>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)} id="register-account-form">
            <div
              className="d-flex flex-row align-items-center btn-group btn-group-toggle"
              data-toggle="buttons"
            >
              <label className="btn btn-primary col-6 active" htmlFor="option1">
                <input
                  type="radio"
                  id="option1"
                  checked
                  {...register("options")}
                  value="Individual"
                />
                Individual{" "}
              </label>
              <label className="btn btn-primary col-6" htmlFor="option2">
                <input
                  type="radio"
                  id="option2"
                  {...register("options")}
                  value="Group"
                />{" "}
                Group
              </label>
            </div>

            <div className="d-flex flex-row align-items-center mb-4 px-5 ml-1">
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
                    Hint: Please insert a valid email to Signup successfully!
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
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
                {errors.password && (
                  <p className="error">
                    Hint: Password must contain UPPERCASE, LOWERCASE and NUMBER,
                    at least 8 characters.
                  </p>
                )}
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-3 px-5">
              <Icon.LockFill size={30} className="px-2 mb-3 mt-2" />
              <div className="form-outline flex-fill mb-3 mt-2">
                <input
                  type="password"
                  id="form3Example4cd"
                  className={`form-control ${
                    errors.passwordConfirm ? "is-invalid" : ""
                  }`}
                  placeholder="Confirm Password"
                  {...register("passwordConfirm", {
                    required: true,
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
                {errors.passwordConfirm && (
                  <p className="error">
                    Don't forget! Your password must match. Goodluck!!
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <Button
                  className="btn btn-primary col-12 active"
                  type="submit"
                  form="register-account-form"
                >
                  Register
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div className="col text-center mt-3">
        <span>or</span>
        {/* <button
        disabled={disabled}
        onClick={() => signUpWithGoogle()}
        className="h-[46px] w-full mt-5 mx-auto border border-red-500 rounded-md p-2 flex justify-center items-center space-x-2 shadow-lg text-gray-500 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors"
      >Try out Google</button> */}
      </div>
      <div className="col text-center">
        {/* <button className="btn mb-3 mt-2">b
          <Icon.Facebook size={30} className="px-2 mb-3 mt-2"/>
          Register via Facebook
        </button> */}
        <button className="btn mb-3 mt-2 border border-secondary">
          <Icon.Google size={30} color={"red"} className="px-2 mb-3 mt-2" />
          Register via Google+
        </button>
      </div>
    </div>
  );
}

export default Register;
