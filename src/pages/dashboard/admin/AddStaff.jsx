import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import useTitle from "../../../hooks/useTitle";

const AddStaff = () => {
  useTitle("Add Staff");
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = async (data) => {
    const profileImage = data.photo[0];
    const formData = new FormData();
    formData.append("image", profileImage);
    const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;
    await axios.post(imageApiUrl, formData).then(async (res) => {
      const staffProfile = {
        email: data.email,
        password: data.password,
        displayName: data.name,
        photoURL: res.data.data.url,
      };

      await axiosSecure.post("/register/staff", staffProfile).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Staff Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/admin/manage-staffs");
      });
    });
  };

  return (
    <div className="mt-5">
      <h1 className="text-4xl font-black text-center mb-8 text-primary-content">
        Staff Account
      </h1>
      <form
        onSubmit={handleSubmit(handleRegistration)}
        className="w-80 mx-auto"
      >
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
            Add Staff
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddStaff;
