import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Controls from "./Controls";
import { Outlet, useLocation } from "react-router-dom";
import useGetAllCategory from "../../hooks/useGetAllCategory";

export default function Dash() {
  const location = useLocation();
  const [isActive, setIsActive] = useState("dash");
  const { getAllCategory } = useGetAllCategory();

  if (!isActive) setIsActive(location.pathname.split("/")[2] ?? "dash");

  useEffect(() => {
    setIsActive(location?.pathname?.split("/")[2] ?? "dash");
  }, [location.pathname]);

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        await getAllCategory();
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategory();
  }, []);

  return (
    <>
      <Grid container>
        <Grid
          xs={12}
          sm={12}
          md={2}
          item
          bgcolor={"#eee"}
          height={"100vh"}
          sx={{
            "@media (max-width:899px)": {
              height: "100%",
            },
          }}>
          <Controls setIsActive={setIsActive} isActive={isActive} />
        </Grid>
        <Grid xs={12} sm={12} md={10} p={2} item>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
