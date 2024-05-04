import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useCategoriesDash } from "../context/CategoriesProvider";

const useDeleteCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useCategoriesDash();

  const deleteCategory = async (password, userId, id) => {
    if (!password) {
      setError("Filling out the field is required");
      return {
        data: null,
        error: true,
        success: false,
      };
    }

    try {
      setIsLoading(true);
      const response = await axiosPrivate.delete(
        `/category/${id}?userId=${userId}&password=${password}`
      );

      const data = await response.data;
      setSuccess(data?.message ?? "Process is Success");
      setError(null);
      dispatch({ type: "delete", id: id });
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
  return { isLoading, success, error, deleteCategory };
};

export default useDeleteCategory;
