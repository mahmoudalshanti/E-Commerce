import { useEffect } from "react";
import { useUserDash } from "../context/UserProvider";
import { Outlet } from "react-router-dom";
import useRefreshToken from "./useRefreshToken";
import { Backdrop, CircularProgress } from "@mui/material";

const Persistent = () => {
  const { user } = useUserDash();
  const { isLoading, refreshToken } = useRefreshToken();

  useEffect(() => {
    const refresher = async () => {
      await refreshToken();
    };
    refresher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : user?.id ? (
    <Outlet />
  ) : null;
};

export default Persistent;
