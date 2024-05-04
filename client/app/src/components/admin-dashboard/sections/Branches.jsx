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
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4),
  createData("Ice cream sandwich", 237, 9.0, 37, 4),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Branches() {
  return (
    <>
      <Stack direction={"row"} justifyContent={"end"} mb={2}>
        <Filter />
      </Stack>
      <Button
        variant="contained"
        color="success"
        sx={{ width: "fit-content", mb: 2 }}>
        Add Branch
      </Button>
      <TableContent />
    </>
  );
}

const TableContent = () => {
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
          {rows.map((row) => (
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Officia sunt blanditiis veritatis quod consequuntur ad,
                    corrupti at alias aperiam cumque optio error tempore ex,
                    placeat fuga perspiciatis voluptatum asperiores sint?
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
              <TableCell align="left">
                <Stack direction={"row"}>
                  <Button size="small" color="secondary">
                    Update
                  </Button>
                  <Button size="small" color="warning">
                    {" "}
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
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
