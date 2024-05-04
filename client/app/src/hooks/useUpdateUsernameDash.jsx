import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useUserDash } from "../context/UserProvider";

const useUpdateUsernameDash = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useUserDash();

  const updateUsernameDash = async (username, id) => {
    if (!username) {
      setError("Filling out the field is required");
      return {
        data: null,
        error: true,
        success: false,
      };
    }

    try {
      setIsLoading(true);
      const response = await axiosPrivate.patch(`/user/username/${id}`, {
        username,
      });
      const data = await response.data;
      setSuccess(data?.message ?? "Process is Success");
      setError(null);
      dispatch({ type: "update-username", payload: data.username });
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
  return { isLoading, success, error, updateUsernameDash };
};

export default useUpdateUsernameDash;
