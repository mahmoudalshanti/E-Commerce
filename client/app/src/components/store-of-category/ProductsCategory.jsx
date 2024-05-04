/* eslint-disable react/prop-types */
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ec1 from "../../Images/e-1.jpg";

export default function ProductsCategory({
  data: { Men, Women, nameCategory, bestSeller, newest, price },
}) {
  return (
    <Stack direction={"column"} spacing={1}>
      <Typography color={"#000"} bgcolor={"#eee"} p={1}>
        Search about:{" "}
        {Men +
          "  " +
          Women +
          "  " +
          nameCategory +
          "  " +
          bestSeller +
          "  " +
          newest +
          "  " +
          "Min Price " +
          price[0] +
          ", Max Price " +
          price[1]}
      </Typography>

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardMedia component={"img"} src={ec1} />
              <CardContent>
                <Typography fontFamily={"muktaM"} fontSize={"1.7rem"}>
                  Title
                </Typography>
                <Stack direction={"row"} spacing={2}>
                  <Avatar src={ec1} variant="square" sx={{ width: "30%" }} />
                  <Avatar src={ec1} variant="square" sx={{ width: "30%" }} />
                  <Avatar src={ec1} variant="square" sx={{ width: "30%" }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}
