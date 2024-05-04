/* eslint-disable react/prop-types */
import { Button, Stack, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Checkout({ qu }) {
  return (
    <Stack direction={"column"}>
      <Button
        endIcon={<ArrowRightAltIcon fontSize="large" />}
        variant="contained"
        sx={{
          margin: "0 0 0px 0",
          bgcolor: "#000",
          ":hover": { bgcolor: "#000" },
        }}
        fullWidth>
        Check out
      </Button>
      <Stack
        sx={{
          "@media (max-width:599px)": {
            order: -1,
            mb: "30px",
            mt: 0,
          },
        }}
        mt={"50px"}
        direction={"column"}
        justifyContent={"space-between"}
        height={"100%"}>
        <Typography fontFamily={"muktaB"} fontSize={"1.5rem"} mb={3}>
          ORDER SUMMARY
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"} mb={1}>
          <Typography>{qu} item</Typography>
          <Typography>$150</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} mb={1}>
          <Typography>Sale Tax</Typography>
          <Typography>$20</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} mb={1} mt={1}>
          <Typography fontFamily={"muktaB"}>Total</Typography>
          <Typography fontFamily={"muktaB"}>$170</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
