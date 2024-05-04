import { Link, Stack } from "@mui/material";

export default function LinksBar() {
  return (
    <Stack direction={"row"}>
      <Link
        sx={{ display: { md: "flex", xs: "none" } }}
        color={"black"}
        mr={2}
        ml={2}
        underline="hover">
        Clothes
      </Link>
      <Link
        sx={{ display: { md: "flex", xs: "none" } }}
        color={"black"}
        mr={2}
        ml={2}
        underline="hover">
        Electronic
      </Link>
      <Link
        sx={{ display: { md: "flex", xs: "none" } }}
        color={"black"}
        mr={2}
        ml={2}
        underline="hover">
        Accessories{" "}
      </Link>
      <Link
        sx={{ display: { md: "flex", xs: "none" } }}
        color={"black"}
        mr={2}
        ml={2}
        underline="hover">
        Furniture
      </Link>
    </Stack>
  );
}
