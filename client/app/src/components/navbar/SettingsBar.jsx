import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IconButton, Stack } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function SettingsBar() {
  return (
    <Stack
      sx={{
        "@media (max-width:899px)": {
          flexGrow: 1,
        },
      }}
      alignItems={"center"}
      spacing={2}
      direction={"row"}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data}
        sx={{
          "@media (max-width:899px)": {
            width: "100%",
          },
          "@media (min-width:899px)": {
            width: "300px",
          },
        }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      <IconButton
        sx={{
          width: "40px",
          height: "40px",
          display: { md: "flex", xs: "none" },
        }}>
        <AddShoppingCartIcon />
      </IconButton>
    </Stack>
  );
}

const data = [{ label: "The Shawshank Redemption" }];
