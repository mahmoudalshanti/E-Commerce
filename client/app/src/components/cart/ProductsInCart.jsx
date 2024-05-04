/* eslint-disable react/prop-types */
import {
  Avatar,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import ec1 from "../../Images/e-1.jpg";
import ClearIcon from "@mui/icons-material/Clear";

export default function ProductsInCart({ setQu, qu }) {
  return (
    <Stack direction={"column"}>
      <Grid
        container
        width={"100%"}
        border={"1px solid #777"}
        bgcolor={"#eee"}
        mb={3}>
        <Grid xs={6} md={6} item>
          <Avatar
            src={ec1}
            variant="square"
            sx={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid xs={6} md={6} item p={2}>
          <Stack direction={"column"}>
            <HeaderCard />
            <InfoCard />
            <SelectCardQu setQu={setQu} qu={qu} />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

const HeaderCard = () => {
  return (
    <Stack
      sx={{
        "@media (max-width:345px)": {
          flexDirection: "column",
        },
      }}
      direction={"row"}
      ml={"auto"}
      alignItems={"center"}>
      <Typography
        sx={{
          "@media (max-width:345px)": {
            order: 1,
          },
        }}
        mr={1}>
        $100.00
      </Typography>
      <IconButton>
        <ClearIcon />
      </IconButton>
    </Stack>
  );
};

const InfoCard = () => {
  return (
    <Stack direction={"column"} width={"100%"}>
      <Typography fontSize={"1.5rem"} fontFamily={"muktaM"} mb={1}>
        T1RX
      </Typography>
      <Typography fontSize={"1.1rem"} fontFamily={"muktaR"} mb={1} noWrap>
        Clothes: shoes
      </Typography>
      <Typography fontSize={"1.1rem"} fontFamily={"muktaR"} mb={1} noWrap>
        Size: Medium
      </Typography>
    </Stack>
  );
};

const SelectCardQu = ({ setQu, qu }) => {
  return (
    <Stack direction={"column"}>
      <FormControl
        sx={{
          width: "50%",
          "@media (max-width:899px)": {
            width: "100%",
          },
        }}>
        <InputLabel id="demo-simple-select-label">Qu</InputLabel>
        <Select
          id="demo-simple-select-label"
          label={"Qu"}
          value={qu}
          onChange={(e) => setQu(e.target.value)}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};
