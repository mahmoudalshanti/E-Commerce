import { Stack, Typography } from "@mui/material";
import DrawerBar from "./DrawerBar";

export default function LogoBar() {
  return (
    <Stack alignItems={"center"} direction={"row"} className="section">
      <DrawerBar />
      <Typography>Store</Typography>
    </Stack>
  );
}
