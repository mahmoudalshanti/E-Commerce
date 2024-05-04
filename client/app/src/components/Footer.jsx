import { Avatar, Box, Grid, Link, Stack, Typography } from "@mui/material";
import ps from "../Images/ps.png";
import logo from "../Images/logo.jpg";
import Tape from "./Tape";
export default function Footer() {
  return (
    <Stack direction={"column"}>
      <Tape />
      <Box padding={2} bgcolor={"#f8f8f8"}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={3}>
            <Typography fontSize={"1.1rem"} fontFamily={"MuktaB"}>
              Help
            </Typography>
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color={"black"}
              fontSize={"1rem"}
              fontFamily={"MuktaR"}>
              Contact us
            </Link>
            <br />
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color={"black"}
              fontSize={"1rem"}
              fontFamily={"MuktaR"}>
              FAQ
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Typography fontSize={"1.1rem"} fontFamily={"MuktaB"}>
              Shop
            </Typography>
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color={"black"}
              fontSize={"1rem"}
              fontFamily={"MuktaR"}>
              Find a store
            </Link>
            <br />
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color={"black"}
              fontSize={"1rem"}
              fontFamily={"MuktaR"}>
              Sale exclusions
            </Link>
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <Typography fontSize={"1.1rem"} fontFamily={"MuktaB"}>
              About Us
            </Typography>
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color={"black"}
              fontSize={"1rem"}
              fontFamily={"MuktaR"}>
              Our Purpose
            </Link>
            <br />
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color={"black"}
              fontSize={"1rem"}
              fontFamily={"MuktaR"}>
              Dev. Team
            </Link>
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <Avatar src={logo} variant="square" sx={{ width: "60px" }} />
            <Typography
              lineHeight={2}
              fontSize={"1.1rem"}
              fontFamily={"MuktaR"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
              temporibus quasi, aut placeat ea iure.
            </Typography>
          </Grid>
        </Grid>

        <Stack
          direction={"row"}
          alignItems={"center"}
          mt={7}
          justifyContent={"space-around"}>
          <Stack direction={"row"}>
            <Avatar
              src={ps}
              alt="palestine"
              variant="square"
              sx={{ width: "60px", margin: "0 10px 0 0" }}
            />
            <Avatar
              src={logo}
              alt="logo"
              variant="square"
              sx={{ width: "60px" }}
            />
          </Stack>
          <Typography fontFamily={"muktaB"} color={"#000"}>
            &copy; Copyright 2023 <br />
            Store.
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
