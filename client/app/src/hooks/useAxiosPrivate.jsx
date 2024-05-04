import { useEffect } from "react";
import { axiosPrivate } from "../apis/axios";
import { useUserDash } from "../context/UserProvider";

const useAxiosPrivate = () => {
  const { user } = useUserDash();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [user.accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
