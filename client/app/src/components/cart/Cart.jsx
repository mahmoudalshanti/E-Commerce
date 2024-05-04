import { Container, Grid, Typography } from "@mui/material";
import ProductsInCart from "./ProductsInCart";
import Checkout from "./Checkout";
import { useState } from "react";

export default function Cart() {
  const [qu, setQu] = useState(10);
  return (
    <Container maxWidth="100%">
      <Typography fontFamily={"muktaB"} fontSize={"2rem"} p={3}>
        YOUR CART
      </Typography>
      <Grid container>
        <Grid
          xs={12}
          sm={6}
          md={8}
          p={3}
          sx={{
            "@media (max-width:600px)": {
              p: 0,
            },
          }}
          item>
          <ProductsInCart setQu={setQu} qu={qu} />
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={4}
          p={3}
          sx={{
            "@media (max-width:600px)": {
              p: 0,
            },
          }}
          item>
          <Checkout qu={qu} />
        </Grid>
      </Grid>
    </Container>
  );
}
