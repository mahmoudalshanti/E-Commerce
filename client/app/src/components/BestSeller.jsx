import { Container } from "@mui/material";
import ProductSlides from "./ProductSlides";

export default function BestSeller() {
  return (
    <Container
      sx={{
        padding: "20px",
        margin: "40px 0",
        backgroundColor: "#eee",
      }}
      maxWidth={"100%"}>
      <ProductSlides
        title={"Best Seller"}
        card={{
          title: "Text",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, excepturi.",
        }}
      />
    </Container>
  );
}
