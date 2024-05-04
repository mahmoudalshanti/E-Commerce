import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useCategoriesDash } from "../context/CategoriesProvider";

const useUpdateSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useCategoriesDash();

  const updateSection = async (name, oldName, id) => {
    if (!name || !id || !oldName) {
      setError("Filling out the fields is required");
      return {
        data: null,
        error: true,
        success: false,
      };
    }

    try {
      setIsLoading(true);
      const response = await axiosPrivate.patch(`/category/section/${id}`, {
        name,
        oldName,
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
      return {
        data: null,
        error: true,
        success: false,
      };
    }
  };
  return { isLoading, success, error, updateSection };
};

export default useUpdateSection;
