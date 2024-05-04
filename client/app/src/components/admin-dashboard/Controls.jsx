/* eslint-disable react/prop-types */
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ClassIcon from "@mui/icons-material/Class";
import { useNavigate } from "react-router-dom";
export default function Controls({ setIsActive, isActive }) {
  const navigate = useNavigate();
  return (
    <ToggleButtonGroup
      sx={{ display: " flex", flexDirection: "column", p: "2rem 0" }}
      exclusive
      onChange={(e, x) => setIsActive(x)}
      value={isActive}>
      <ToggleButton
        onClick={() => navigate("/dash/orders")}
        value={"orders"}
        sx={{ border: "none" }}>
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}>
          <BookmarksIcon color="primary" />
          <Typography width={"150px"}>Orders</Typography>
        </Stack>
      </ToggleButton>
      <ToggleButton
        onClick={() => navigate("/dash/categories")}
        value={"categories"}
        sx={{ border: "none" }}>
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}>
          <SpaceDashboardIcon color="primary" />
          <Typography width={"150px"}>Categories</Typography>
        </Stack>
      </ToggleButton>
      <ToggleButton
        onClick={() => navigate("/dash/sections")}
        value={"sections"}
        sx={{ border: "none" }}>
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}>
          <ClassIcon color="primary" />
          <Typography width={"150px"}>Sections</Typography>
        </Stack>
      </ToggleButton>
      <ToggleButton
        onClick={() => navigate("/dash/branches")}
        value={"branches"}
        sx={{ border: "none" }}>
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}>
          <ClassIcon color="primary" />
          <Typography width={"150px"}>Branches</Typography>
        </Stack>
      </ToggleButton>
      <ToggleButton
        onClick={() => navigate("/dash/slide")}
        value={"slider"}
        sx={{ border: "none" }}>
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}>
          <LinearScaleIcon color="primary" />
          <Typography width={"150px"}> Slider</Typography>
        </Stack>
      </ToggleButton>
      <ToggleButton
        onClick={() => navigate("/dash/statistics")}
        value={"statistics"}
        sx={{ border: "none" }}>
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}>
          <BarChartIcon color="primary" />
          <Typography width={"150px"}>Statistics</Typography>
        </Stack>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
