import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useCategoriesDash } from "../context/CategoriesProvider";

const useUpdateDescriptionOfCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useCategoriesDash();
  const updateDescription = async (description, id) => {
    if (!description || !id) {
      setError("Filling out the fields is required");
      return {
        data: null,
        error: true,
        success: false,
      };
    }

    try {
      setIsLoading(true);
      const response = await axiosPrivate.patch(`/category/desc/${id}`, {
        description,
      });
      const data = await response.data;
      setSuccess(data?.message ?? "Process is Success");
      setError(null);
      dispatch({
        type: "update-description",
        payload: data.description,
        id: id,
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
  return { isLoading, success, error, updateDescription };
};

export default useUpdateDescriptionOfCategory;
