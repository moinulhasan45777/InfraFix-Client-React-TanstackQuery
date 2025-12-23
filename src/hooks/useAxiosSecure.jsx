import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "https://infra-fix-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error?.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          logOut()
            .then(() => navigate("/auth/login"))
            .catch((err) =>
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.message || "Authentication error",
              })
            );
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
