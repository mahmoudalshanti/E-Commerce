/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const userContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "setUser":
      return {
        ...action.payload,
        accessToken: action.accessToken,
        role: {
          number: action.payload.role,
          specific:
            action.payload.role === 5021
              ? "SuperAdmin"
              : action.payload.role === 5022
              ? "Admin"
              : action.payload.role === 4021
              ? "Editor"
              : null,
        },
      };

    case "update-username":
      return { ...state, username: action.payload };
  }
}

export default function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, {});

  return (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  );
}

export const useUserDash = () => {
  return useContext(userContext);
};
