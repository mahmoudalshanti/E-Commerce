import { Grid } from "@mui/material";
import Filter from "./Filter";
import ProductsCategory from "./ProductsCategory";
import { useState } from "react";

export default function Store() {
  const [menIsChecked, setMenIsChecked] = useState(true);
  const [WomenIsChecked, setWomenIsChecked] = useState(true);
  const [nameCategory, setNameCategory] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [newest, setNewest] = useState(false);
  const [price, setPrice] = useState([20, 2000]);

  return (
    <Grid container>
      <Grid item md={2} sm={12} xs={12} bgcolor={"#eee"} p={2}>
        <Filter
          data={{
            menIsChecked,
            setMenIsChecked,
            WomenIsChecked,
            setWomenIsChecked,
            nameCategory,
            setNameCategory,
            bestSeller,
            setBestSeller,
            newest,
            setNewest,
            price,
            setPrice,
          }}
        />
      </Grid>
      <Grid item md={10} sm={12} xs={12} bgcolor={"#ccc"} p={2}>
        <ProductsCategory
          data={{
            Men: menIsChecked ? "Men, " : "",
            Women: WomenIsChecked ? "Women, " : "",
            nameCategory: nameCategory ? nameCategory : "All Categories, ",
            bestSeller: bestSeller ? "Best Seller, " : "",
            newest: newest ? " Newest," : "",
            price,
          }}
        />
      </Grid>
    </Grid>
  );
}
