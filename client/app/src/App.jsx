import { lazy } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import Cart from "./components/cart/Cart";
import Dash from "./components/admin-dashboard/Dash";
import { Route, Routes } from "react-router-dom";
import DashLayout from "./components/admin-dashboard/DashLayout";
import RequireAuth from "./protected-hooks/RequireAuth";
import Persistent from "./hooks/Persistent";
import NavDash from "./components/admin-dashboard/NavDsah";
import AccountDash from "./components/admin-dashboard/AccountDash";
import { useUserDash } from "./context/UserProvider";
import Orders from "./components/admin-dashboard/sections/Orders";
import Categories from "./components/admin-dashboard/sections/Categories";
import Sections from "./components/admin-dashboard/sections/Sections";
import Branches from "./components/admin-dashboard/sections/Branches";
import Slide from "./components/admin-dashboard/sections/Slide";
import Statistics from "./components/admin-dashboard/sections/Statistics";

const SignIn = lazy(() => import("./components/auth-registration/SignIn"));
const SignUp = lazy(() => import("./components/auth-registration/SignUp"));
const BestSeller = lazy(() => import("./components/BestSeller"));
const HomeSlider = lazy(() => import("./components/HomeSlider"));
const Product = lazy(() => import("./components/Product"));
const Footer = lazy(() => import("./components/Footer"));
const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Store = lazy(() => import("./components/store-of-category/Store"));
const NewArrivalSlider = lazy(() => import("./components/NewArrivalSlider"));
const Category = lazy(() => import("./components/category-slides/Category"));

const theme = createTheme({
  typography: {
    fontFamily: "MuktaR",
    fontSize: 16,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2} variant="default">
        {/* <Navbar />
          <HomeSlider />
          <BestSeller />
          <NewArrivalSlider />
          <Category />
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary> */}
        {/* <Product /> */}
        {/* <Store /> */}
        {/* <Cart /> */}

        <Routes>
          <Route path="/dash" element={<DashLayout />}>
            <Route element={<Persistent />}>
              <Route element={<RequireAuth />}>
                <Route element={<NavDash />}>
                  <Route element={<Dash />}>
                    <Route index element={<>Welcome Dash</>} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="sections" element={<Sections />} />
                    <Route path="branches" element={<Branches />} />
                    <Route path="slide" element={<Slide />} />
                    <Route path="statistics" element={<Statistics />} />
                  </Route>
                  <Route path="account" element={<AccountDash />} />
                </Route>
              </Route>
            </Route>
            <Route path="signin" element={<SignIn />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
