import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged In!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error 500: Internal Server Error",
          text: "Could not Log in!",
        });
      });
  };
  return (
    <div>
      <h1 className="text-4xl font-black text-center mb-8 text-primary-content">
        Login
      </h1>
      <form onSubmit={handleSubmit(handleLogin)} className="w-80 ">
        <fieldset className="fieldset">
          <label className="label text-primary-content">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input "
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required!</p>
          )}
          <label className="label text-primary-content">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required!</p>
          )}
          <div>
            <Link
              to="/auth/forgot-password"
              className="link link-hover text-secondary underline underline-offset-3 hover:no-underline"
            >
              Forgot password?
            </Link>
          </div>
          <button className="btn btn-secondary mt-4 mb-4">Login</button>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="ml-1 text-secondary underline hover:no-underline underline-offset-3"
            >
              Register
            </Link>
          </p>
          {/* <div className="flex items-center gap-2">
                <div className="h-px w-full bg-primary"></div>
                <p className="font-bold">OR</p>
                <div className="h-px w-full bg-primary"></div>
              </div> */}
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
