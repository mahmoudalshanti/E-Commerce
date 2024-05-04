/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Checkbox,
  FormControlLabel,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

export default function Filter({
  data: {
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
  },
}) {
  return (
    <Stack direction={"column"} height={"100%"} mb={7}>
      <Typography fontFamily={"muktaM"} fontSize={"1.8rem"} mb={7}>
        ClOTHES
      </Typography>
      <GenderFilter
        setMenIsChecked={setMenIsChecked}
        setWomenIsChecked={setWomenIsChecked}
        menIsChecked={menIsChecked}
        WomenIsChecked={WomenIsChecked}
      />
      <CategoryFilter
        setNameCategory={setNameCategory}
        nameCategory={nameCategory}
      />
      <TypeFilter
        setBestSeller={setBestSeller}
        setNewest={setNewest}
        bestSeller={bestSeller}
        newest={newest}
      />
      <PriceFilter setPrice={setPrice} price={price} />
    </Stack>
  );
}

const GenderFilter = ({
  setMenIsChecked,
  setWomenIsChecked,
  menIsChecked,
  WomenIsChecked,
}) => {
  return (
    <Stack direction={"column"}>
      <Typography fontFamily={"muktaR"} fontSize={"1.5rem"}>
        Gender
      </Typography>
      <Stack direction={"column"}>
        <FormControlLabel
          label={"Men"}
          control={
            <Checkbox
              size="small"
              checked={menIsChecked}
              onChange={(e) => setMenIsChecked(e.target.checked)}
            />
          }
        />
        <FormControlLabel
          label={"Women"}
          control={
            <Checkbox
              size="small"
              checked={WomenIsChecked}
              onChange={(e) => setWomenIsChecked(e.target.checked)}
            />
          }
        />
      </Stack>
    </Stack>
  );
};

const CategoryFilter = ({ setNameCategory, nameCategory }) => {
  return (
    <Stack direction={"column"} mt={3}>
      <Typography mb={1} fontFamily={"muktaR"} fontSize={"1.5rem"}>
        Category
      </Typography>
      <ToggleButtonGroup
        className="toggleFilterBtn"
        exclusive
        value={nameCategory}
        onChange={(e, x) => setNameCategory(x)}>
        <ToggleButton className="buttonFilter" value={"Name1"}>
          Shirt
        </ToggleButton>
        <ToggleButton className="buttonFilter" value={"Name2"}>
          Jens
        </ToggleButton>
        <ToggleButton className="buttonFilter" value={"Name3"}>
          Shoes
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

const TypeFilter = ({ setBestSeller, setNewest, bestSeller, newest }) => {
  return (
    <Stack direction={"column"} mt={3}>
      <FormControlLabel
        label={"Best Seller"}
        control={
          <Checkbox
            size="small"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
          />
        }
      />
      <FormControlLabel
        label={"Newest"}
        control={
          <Checkbox
            size="small"
            checked={newest}
            onChange={(e) => setNewest(e.target.checked)}
          />
        }
      />
    </Stack>
  );
};

const PriceFilter = ({ setPrice, price }) => {
  return (
    <Stack direction={"column"} mt={3}>
      <Typography fontFamily={"muktaR"} fontSize={"1.5rem"}>
        Price
      </Typography>
      <Typography fontFamily={"muktaM"} fontSize={"1.1rem"}>
        Currency : $USD
      </Typography>
      <Stack direction={"row"}>
        <Slider
          max={7000}
          min={3}
          size="medium"
          sx={{
            width: "50%",
            color: "#777",
            "@media (max-width: 600px)": {
              width: "90%",
            },
          }}
          value={price}
          onChange={(e, x) => setPrice(x)}
          valueLabelDisplay="auto"
        />
      </Stack>
    </Stack>
  );
};
