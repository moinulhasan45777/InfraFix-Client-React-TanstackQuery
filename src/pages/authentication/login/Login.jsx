import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <h1 className="text-4xl font-black text-center mb-8 text-primary-content">
        Login
      </h1>
      <form className="w-80 ">
        <fieldset className="fieldset">
          <label className="label text-primary-content">Email</label>
          <input type="email" className="input " placeholder="Email" />
          <label className="label text-primary-content">Password</label>
          <input type="password" className="input" placeholder="Password" />
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
