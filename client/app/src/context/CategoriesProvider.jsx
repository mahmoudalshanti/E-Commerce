/* eslint-disable no-case-declarations */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

function sort_by_id() {
  return function (elem1, elem2) {
    if (elem1.id < elem2.id) {
      return -1;
    } else if (elem1.id > elem2.id) {
      return 1;
    } else {
      return 0;
    }
  };
}

const categoryContext = createContext();

const initState = {
  data: [],
  error: false,
  success: false,
  isLoading: false,
};

function userReducer(state, action) {
  switch (action.type) {
    case "setCategories":
      const reCategory = action?.payload?.map((category) => {
        category.id = category._id;
        return category;
      });
      return {
        data: [...reCategory].sort(sort_by_id()),
        error: action.error,
        success: action.success,
        isLoading: action.isLoading,
      };

    case "update-description": {
      const getCategory = state.data.find(
        (category) => category.id == action.id
      );
      getCategory.description = action.payload;
      return {
        ...state,
        data: [
          ...state.data.filter((category) => category.id !== action.id),
          getCategory,
        ].sort(sort_by_id()),
      };
    }
    case "update-name": {
      const getCategory = state.data.find(
        (category) => category.id == action.id
      );
      getCategory.name = action.payload;
      return {
        ...state,
        data: [
          ...state.data.filter((category) => category.id !== action.id),
          getCategory,
        ].sort(sort_by_id()),
      };
    }
    case "delete": {
      return {
        ...state,
        data: [
          ...state.data.filter((category) => category.id !== action.id),
        ].sort(sort_by_id()),
      };
    }

    case "setSection": {
      const getCategory = state.data.find(
        (category) =>
          category.name.toLowerCase() === action.category.toLowerCase()
      );
      const reCategories = state.data.filter(
        (category) =>
          category.name.toLowerCase() !== action.category.toLowerCase()
      );

      return {
        ...state,
        data: [
          ...reCategories,
          {
            ...getCategory,
            sections: [...getCategory.sections, action.payload],
          },
        ],
      };
    }
  }
}

export default function CategoriesProvider({ children }) {
  const [categories, dispatch] = useReducer(userReducer, initState);

  return (
    <categoryContext.Provider value={{ categories, dispatch }}>
      {children}
    </categoryContext.Provider>
  );
}

export const useCategoriesDash = () => {
  return useContext(categoryContext);
};
