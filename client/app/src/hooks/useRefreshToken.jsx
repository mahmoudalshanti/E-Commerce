import { useState } from "react";
import { useUserDash } from "../context/UserProvider";
import jwtDecode from "jwt-decode";
import axios from "../apis/axios";

const useRefreshToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useUserDash();

  const refreshToken = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/auth/refreshToken");

      const data = await response.data;
      setSuccess(data?.message ?? "Process is Success");
      setError(null);
      const decode = jwtDecode(data.accessToken);
      console.log(decode);

      dispatch({
        type: "setUser",
        payload: decode,
        accessToken: data.accessToken,
      });
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
      return {
        data: null,
        error: true,
        success: false,
      };
    }
  };
  return { isLoading, success, error, refreshToken };
};

export default useRefreshToken;
