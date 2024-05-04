import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useCategoriesDash } from "../context/CategoriesProvider";

const useCreateNewSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useCategoriesDash();

  const createNewCategory = async (section, id) => {
    if (!section || !id) {
      setError("Filling out the fields is required");
      return {
        data: null,
        error: true,
        success: false,
      };
    }

    try {
      setIsLoading(true);
      const response = await axiosPrivate.post(`/category/section/${id}`, {
        section,
      });

      const data = await response.data;
      dispatch({
        type: "setSection",
        payload: data.section,
        category: data.section.category,
      });
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
  return { isLoading, success, error, createNewCategory };
};

export default useCreateNewSection;
