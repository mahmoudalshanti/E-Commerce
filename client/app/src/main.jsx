import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import UserProvider from "./context/UserProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import CategoriesProvider from "./context/CategoriesProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoriesProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CategoriesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
