import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";

const AdminProfile = () => {
  useTitle("Profile");
  const { user, updateUser, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: citizen = [], refetch } = useQuery({
    queryKey: ["citizen", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/citizen?email=${user.email}`);
      return res.data;
    },
  });

  const handleUpdate = (e) => {
    const newProfile = {
      displayName: e.target.name.value,
      photoURL: e.target.photoUrl.value,
    };

    updateUser(newProfile)
      .then(async () => {
        const newUser = {
          name: newProfile.displayName,
          photo: newProfile.photoURL,
        };

        await axiosSecure
          .patch(`/update-user/${user?.email}`, newUser)
          .then(() => {
            Swal.fire({
              title: "Updated!",
              text: "Update Completed",
              icon: "success",
            });
            setLoading(false);
            refetch();
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
        Admin Profile
      </h2>

      {/* Avatar + Badge */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Citizen Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
          />
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName}
            className="input input-bordered w-full"
            placeholder="Enter your full name"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Photo URL
          </label>
          <input
            type="text"
            name="photoUrl"
            defaultValue={user?.photoURL}
            className="input input-bordered w-full"
            placeholder="Paste your profile photo URL"
          />
        </div>

        {/* Update Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Update Profile
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Warning Section */}
      {citizen[0]?.status === "Blocked" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="text-yellow-600 mt-1" size={20} />
          <div>
            <h4 className="font-medium text-yellow-800">Warning</h4>
            <p className="text-sm text-yellow-700 mt-1 leading-relaxed">
              You have been blocked. Please contact the authorities immediately.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
