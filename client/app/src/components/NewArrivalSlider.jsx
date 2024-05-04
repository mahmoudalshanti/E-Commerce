import { Container } from "@mui/material";
import ProductSlides from "./ProductSlides";

export default function NewArrivalSlider() {
  return (
    <Container maxWidth={"100%"}>
      <ProductSlides
        title={"New Arrivals"}
        card={{
          title: "Text",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, excepturi.",
        }}
      />
    </Container>
  );
}
