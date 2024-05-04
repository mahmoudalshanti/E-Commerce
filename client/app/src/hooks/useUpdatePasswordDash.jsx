import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useUpdatePasswordDash = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const updatePasswordDash = async (password, passwordConfirm, id) => {
    if (!password || !passwordConfirm) {
      setError("Filling out the fields is required");
      return {
        data: null,
        error: true,
        success: false,
      };
    }
    if (password !== passwordConfirm) {
      setError("No match between password and confirm password");

      return {
        data: null,
        error: true,
        success: false,
      };
    }

    try {
      setIsLoading(true);
      const response = await axiosPrivate.patch(`/user/password/${id}`, {
        password,
      });

      const data = await response.data;
      setSuccess(data?.message ?? "Process is Success");
      setError(null);
      setIsLoading(false);

      return {
        data: data,
        success: true,
        error: true,
      };
    } catch (err) {
      setError(err?.response?.data?.message ?? "Something Error");
      setSuccess(null);
      setIsLoading(false);
      console.log(err);
      return {
        data: null,
        error: true,
        success: false,
      };
    }
  };
  return { isLoading, success, error, updatePasswordDash };
};

export default useUpdatePasswordDash;
