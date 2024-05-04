import { ToggleButton, ToggleButtonGroup } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function Buttons({ isActive, setIsActive }) {
  return (
    <ToggleButtonGroup
      color="standard"
      value={isActive}
      exclusive
      className="toggleButtonGroup"
      onChange={(e, x) => setIsActive(x)}>
      <ToggleButton value={"clothes"}>Clothes</ToggleButton>
      <ToggleButton value={"electronic"}>Electronic</ToggleButton>
      <ToggleButton value={"Accessories"}>Accessories</ToggleButton>
      <ToggleButton value={"Furniture"}>Furniture</ToggleButton>
    </ToggleButtonGroup>
  );
}
