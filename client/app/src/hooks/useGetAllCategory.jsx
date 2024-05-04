import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useCategoriesDash } from "../context/CategoriesProvider";

const useGetAllCategory = () => {
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useCategoriesDash();

  const getAllCategory = async () => {
    try {
      dispatch({
        type: "setCategories",
        payload: [],
        error: false,
        success: false,
        isLoading: true,
      });

      const response = await axiosPrivate.get(`/category`);
      const data = await response.data;

      dispatch({
        type: "setCategories",
        payload: data.categories,
        error: false,
        success: true,
        isLoading: false,
      });

      return data;
    } catch (err) {
      dispatch({
        type: "setCategories",
        payload: [],
        error: true,
        success: false,
        isLoading: false,
      });

      return null;
    }
  };
  return { getAllCategory };
};

export default useGetAllCategory;
