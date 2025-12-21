import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, signInGoogle, updateUser, loading, setLoading } =
    useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const profileImage = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        // Store the image and get the photo url
        const formData = new FormData();
        formData.append("image", profileImage);
        const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(imageApiUrl, formData).then((res) => {
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUser(userProfile)
            .then(() => {
              const user = {
                name: data.name,
                photo: res.data.data.url,
                email: data.email,
                role: "citizen",
                status: "free",
                issue_count: 0,
              };

              axiosSecure.post("/register", user).then(() => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Registration Complete!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setLoading(false);
                navigate("/");
              });
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "Error 500: Internal Server Error",
                text: "Could not complete registration!",
              });
              setLoading(false);
            });
        });
        // Updating User Profile
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error 500: Internal Server Error",
          text: "Could not complete registration!",
        });
      });
  };

  const handleSignInGoogle = () => {
    signInGoogle()
      .then((result) => {
        const user = {
          name: result.user.displayName,
          photo: result.user.photoURL,
          email: result.user.email,
          role: "user",
        };
        axiosSecure.post("/register", user).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration Complete!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error 500: Internal Server Error",
          text: "Could not complete registration!",
        });
      });
  };

  return (
    <div>
      <h1 className="text-4xl font-black text-center mb-8 text-primary-content">
        Register
      </h1>
      <form onSubmit={handleSubmit(handleRegistration)} className="w-80 ">
        <fieldset className="fieldset">
          <label className="label text-primary-content">Full Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Full Name"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Full Name is required!</p>
          )}
          <label className="label text-primary-content">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Image"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Profile Photo is required!</p>
          )}
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
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required!</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 characters long!</p>
          )}
          <button disabled={loading} className="btn btn-secondary mt-4 mb-2">
            Register
          </button>
          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-primary"></div>
            <p className="font-bold">OR</p>
            <div className="h-px w-full bg-primary"></div>
          </div>
          <button
            onClick={handleSignInGoogle}
            className="btn bg-base-200 text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="ml-1 text-secondary underline hover:no-underline underline-offset-3"
            >
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
