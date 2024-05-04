/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Grid, Typography } from "@mui/material";

import ProductSlides from "../ProductSlides";

export default function Products({ categoryName }) {
  return (
    <Grid container mt={5} spacing={3}>
      <Grid item md={3} xs={12} sm={12}>
        <ProductDescription categoryName={categoryName} />
      </Grid>
      <Grid item md={9} xs={12} sm={12}>
        <ProductSlides
          card={{
            title: "Text",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, excepturi.",
          }}
        />
      </Grid>
    </Grid>
  );
}

const ProductDescription = ({ categoryName }) => {
  return (
    <>
      <Typography mb={1} fontSize={"2rem"}>
        {categoryName?.toUpperCase()}
      </Typography>
      <Typography mb={5}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia modi
        quia quidem.
      </Typography>
      <Button color="success" variant="contained">
        View Collection
      </Button>
    </>
  );
};
