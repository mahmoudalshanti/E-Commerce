import { Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
export default function Tape() {
  return (
    <Grid
      container
      bgcolor={"#03001C"}
      alignItems={"center"}
      padding={3}
      mt={15}
      spacing={2}
      justifyContent={"space-evenly"}>
      <Grid item color={"#fff"}>
        <Typography fontSize={"2rem"} fontFamily={"muktaM"}>
          Want Sale Your Products ?
        </Typography>
        <Typography
          fontFamily={"muktaR"}
          fontSize={"1.2rem"}
          lineHeight={1.6}
          maxWidth={"420px"}>
          Do you want, once you log in, you can sell your products through the
          platform?
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ margin: "0 10px" }}
          endIcon={<ArrowRightAltIcon />}
          size="large"
          color="primary"
          variant="outlined">
          Sign in
        </Button>
        <Button
          endIcon={<AddIcon />}
          size="large"
          color="primary"
          variant="contained">
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}
