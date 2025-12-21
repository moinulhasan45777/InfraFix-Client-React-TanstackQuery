import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const ReportIssue = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const issueCategories = [
    "Roads & Transportation",
    "Water & Sanitation",
    "Electricity & Power",
    "Waste Management",
    "Public Safety",
    "Environment & Public Spaces",
    "Construction & Building Safety",
    "Public Facilities",
    "Traffic & Signals",
    "Law & Civic Issues",
    "Health Hazards",
    "Other",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const handleAddIssue = (data) => {
    if (citizen[0].status == "free" && citizen[0].issue_count >= 3) {
      Swal.fire({
        icon: "error",
        title:
          "Maximum Limit Reached in Free Mode! Please Subscribe to get more Reports!",
      });
      return;
    }

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;
    axios.post(imageApiUrl, formData).then((res) => {
      const newIssue = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        image: res.data.data.url,
        createdBy: user.email,
        createdAt: new Date(),
      };

      axiosSecure
        .post("/issue", newIssue)
        .then(() => {
          const updatedCount = {
            issue_count: citizen[0].issue_count + 1,
          };
          axiosSecure
            .patch(`/citizen/issue_count/${citizen[0]._id}`, updatedCount)
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Issue submitted Successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch;
              navigate("/dashboard/citizen/my-issues");
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: { error },
          });
        });
    });
  };

  const { data: citizen = [], refetch } = useQuery({
    queryKey: ["citizen", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/citizen?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-3xl ml-10 p-6 mt-10 shadow-2xl rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Report an Issue
      </h2>

      <form onSubmit={handleSubmit(handleAddIssue)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            {...register("title", { required: true })}
            placeholder="Enter issue title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
          />
          {errors.title?.type === "required" && (
            <p className="text-red-500">Title is required!</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            {...register("description", { required: true })}
            placeholder="Describe the issue in detail"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
          />
          {errors.description?.type === "required" && (
            <p className="text-red-500">Description is required!</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            defaultValue="Select a category"
            name="category"
            {...register("category", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
          >
            <option disabled={true}>Select a category</option>
            {issueCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.cateogry?.type === "required" && (
            <p className="text-red-500">Category is required!</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            {...register("location", { required: true })}
            placeholder="Enter location or address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 mb-1">Upload Image</label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full"
          />
          {errors.image?.type === "required" && (
            <p className="text-red-500">Image is required!</p>
          )}
        </div>

        {/* Submit Button */}
        <button className="w-full btn btn-secondary  py-2 rounded-m ">
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
