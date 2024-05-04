import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useCategoriesDash } from "../context/CategoriesProvider";

const useCreateNewCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useCategoriesDash();

  const createNewCategory = async (name, description, sections, branches) => {
    if (!name || !description || !branches) {
      setError("Filling out the fields is required");
      return {
        data: null,
        error: true,
        success: false,
      };
    }

    try {
      setIsLoading(true);
      const response = await axiosPrivate.post("/category", {
        name,
        description,
        branches,
        sections,
      });
      const data = await response.data;
      console.log("cat", data.categories);
      dispatch({ type: "setCategories", payload: data.categories });
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

export default useCreateNewCategory;
