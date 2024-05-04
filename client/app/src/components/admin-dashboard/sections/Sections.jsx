/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import SectionsDialogs from "../SectionsDialogs";
import { useCategoriesDash } from "../../../context/CategoriesProvider";

export default function Sections() {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState({});
  const { categories } = useCategoriesDash();
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState(null);

  // categories?.data?.map((category) => {
  //   console.log([...category.sections]);
  // });
  return (
    <>
      <SectionsDialogs
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        status={status}
        category={category}
        section={section}
      />

      <Stack direction={"row"} justifyContent={"end"} mb={2}>
        <Filter />
      </Stack>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          setStatus("section-add");
          setIsOpen(true);
        }}
        sx={{ width: "fit-content", mb: 2 }}>
        Add Section
      </Button>
      <TableContent
        setIsOpen={setIsOpen}
        setStatus={setStatus}
        categories={categories}
        setCategory={setCategory}
        setSection={setSection}
      />
    </>
  );
}

const TableContent = ({
  setIsOpen,
  setStatus,
  categories,
  setCategory,
  setSection,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead sx={{ bgcolor: "royalblue" }}>
          <TableRow>
            <TableCell>
              <Typography color={"#fff"}>Name</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color={"#fff"}>Category Followed</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color={"#fff"}>Products</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color={"#fff"}>Date of Created</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color={"#fff"}>Date of Last Update</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color={"#fff"}>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.data.map((category) => {
            return category.sections.map((row) => {
              return (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}>
                      <Typography fontSize={"1rem"}>{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}>
                      <Typography fontSize={"1rem"} noWrap maxWidth={"120px"}>
                        {row.category}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell align="left">{row.products}</TableCell>
                  <TableCell align="left">{row.createdAt}</TableCell>
                  <TableCell align="left">{row.lastUpdate}</TableCell>
                  <TableCell align="left">
                    <Stack direction={"row"}>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => {
                          setStatus("section-update");
                          setCategory(category);
                          setIsOpen(true);
                          setSection(row.name);
                        }}>
                        Update
                      </Button>
                      <Button size="small" color="warning">
                        {" "}
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.title,
});

const Filter = () => {
  return (
    <Autocomplete
      id="filter-demo"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Custom filter" />}
    />
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
