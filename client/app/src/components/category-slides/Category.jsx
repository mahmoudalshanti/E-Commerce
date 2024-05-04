import { useState } from "react";
import Buttons from "./Buttons";
import Products from "./Products";
import { Container } from "@mui/material";

export default function Category() {
  const [isActive, setIsActive] = useState("clothes");
  if (!isActive) setIsActive("clothes");

  return (
    <Container
      maxWidth={"100%"}
      sx={{
        padding: "20px",
        margin: "40px 0",
        backgroundColor: "#eee",
      }}>
      <Buttons isActive={isActive} setIsActive={setIsActive} />
      <Products categoryName={isActive} />
    </Container>
  );
}
