/* eslint-disable react/prop-types */
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,
});

export default function Filter({ label, option, setCategorySelected }) {
  return (
    <Autocomplete
      id="filter-demo"
      options={option}
      getOptionLabel={(option) => option.name}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      onChange={(e, x) => setCategorySelected(x)}
      renderInput={(params) => (
        <TextField {...params} label={label} helperText="required" />
      )}
    />
  );
}
