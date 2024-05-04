/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import ec1 from "../Images/e-1.jpg";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useSnackbar } from "notistack";
import { useState } from "react";
import ProductSlides from "./ProductSlides";

export default function Product() {
  const { enqueueSnackbar } = useSnackbar();
  const [size, setSize] = useState("medium");
  if (!size) setSize("medium");

  return (
    <Container maxWidth={"100%"}>
      <ProductGallery
        enqueueSnackbar={enqueueSnackbar}
        size={size}
        setSize={setSize}
      />
      <Stack mt={20}>
        <ProductSlides
          title={"YOU MAY ALSO LIKE"}
          card={{
            title: "Text",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor",
          }}
        />
      </Stack>
    </Container>
  );
}

const ProductGallery = ({ enqueueSnackbar, size, setSize }) => {
  return (
    <Grid container spacing={7}>
      <Grid item xs={12} sm={12} md={7}>
        <Grid
          container
          justifyContent={"center"}
          spacing={2}
          className="gridContainerCart">
          <Grid item xs={12} sm={6} md={6}>
            <Avatar
              src={ec1}
              sx={{ width: "100%", height: "100%" }}
              variant="square"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Avatar
              src={ec1}
              sx={{ width: "100%", height: "100%" }}
              variant="square"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Avatar
              src={ec1}
              sx={{ width: "100%", height: "100%" }}
              variant="square"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Avatar
              src={ec1}
              sx={{ width: "100%", height: "100%" }}
              variant="square"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} xs={12} md={5}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography fontSize={"1rem"} fontFamily={"muktaM"}>
            Category Name
          </Typography>
          <Box>
            <StarIcon fontSize="small" />
            <StarIcon fontSize="small" />
            <StarIcon fontSize="small" />
            <StarHalfIcon fontSize="small" />
            <StarOutlineIcon fontSize="small" />
          </Box>
        </Stack>
        <Typography maxWidth={"300px"} fontSize={"2rem"} fontFamily={"muktaM"}>
          FuelCell SuperComp Trainer v2
        </Typography>
        <Typography fontSize={"1.5rem"} fontFamily={"muktaB"}>
          $460
        </Typography>
        <Stack direction={"column"} mt={5}>
          <Typography mb={1} fontSize={"1.2rem"} fontFamily={"muktaB"}>
            Colors
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Avatar
              src={ec1}
              sx={{ width: "15%", height: "70px" }}
              variant="square"
            />
            <Avatar
              src={ec1}
              sx={{ width: "15%", height: "70px" }}
              variant="square"
            />
          </Stack>
        </Stack>
        <Stack direction={"column"} mt={5}>
          <Typography mb={1} fontSize={"1.2rem"} fontFamily={"muktaB"}>
            Select Size
          </Typography>
          <ToggleButtonGroup
            className="toggleButtonGroup"
            exclusive
            value={size}
            onChange={(e, x) => setSize(x)}>
            <ToggleButton value={"small"}>small</ToggleButton>
            <ToggleButton value={"medium"}>medium</ToggleButton>
            <ToggleButton value={"large"}>large</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack direction={"column"} mt={5}>
          <Typography mb={1} fontSize={"1.2rem"} fontFamily={"muktaB"}>
            Description:
          </Typography>
          <Typography fontSize={"1.2rem"} fontFamily={"muktaR"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, dolor
            ab suscipit inventore illo nisi labore placeat, facilis repudiandae
            iure, nihil et consequatur odio corporis minima! Ipsam alias a vel?
          </Typography>
        </Stack>
        <Button
          sx={{ mt: "50px" }}
          className="addToCart"
          fullWidth
          color="inherit"
          variant="contained"
          size="large"
          onClick={() => enqueueSnackbar("ADD TO CART")}>
          ADD TO CART
        </Button>
      </Grid>
    </Grid>
  );
};
