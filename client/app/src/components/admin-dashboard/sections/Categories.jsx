/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { CategoryDialog } from "../CategoryDialogs";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCategoriesDash } from "../../../context/CategoriesProvider";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default function Categories() {
  const [status, setStatus] = useState("");
  const { categories } = useCategoriesDash();
  const [category, setCategory] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CategoryDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        status={status}
        category={category}
      />
      <Button
        endIcon={<AddIcon />}
        variant="contained"
        color="success"
        onClick={() => {
          setStatus("category-add");
          setIsOpen(true);
        }}
        sx={{ width: "fit-content", mb: 2 }}>
        Create New Category
      </Button>

      {categories.isLoading ? (
        <>
          <br />
          <CircularProgress />
        </>
      ) : (
        <TableContent
          setIsOpen={setIsOpen}
          setStatus={setStatus}
          categories={categories}
          setCategory={setCategory}
        />
      )}
    </>
  );
}

const TableContent = ({ setIsOpen, setStatus, categories, setCategory }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead sx={{ bgcolor: "royalblue" }}>
          <TableRow>
            <TableCell>
              <Typography color={"#fff"}>Name</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color={"#fff"}>Description</Typography>
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
          {categories.data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}>
                  <Typography fontSize={"1rem"}>
                    {toTitleCase(row.name)}
                  </Typography>
                  <Stack direction={"row"}>
                    <Button
                      size="small"
                      color="info"
                      onClick={() => {
                        setStatus("category-update-name");
                        setIsOpen(true);
                        setCategory(row);
                      }}>
                      Update
                    </Button>
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell align="left">
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}>
                  <Typography fontSize={"1rem"} noWrap maxWidth={"120px"}>
                    {row.description}
                  </Typography>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Button
                      size="small"
                      color="info"
                      onClick={() => {
                        setStatus("category-update-description");
                        setIsOpen(true);
                        setCategory(row);
                      }}>
                      Update
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => {
                        setStatus("category-view-description");
                        setIsOpen(true);
                        setCategory(row);
                      }}>
                      View
                    </Button>
                  </Stack>
                </Stack>
              </TableCell>

              <TableCell align="left">10</TableCell>
              <TableCell align="left">{row.createdAt}</TableCell>
              <TableCell align="left">{row.updatedAt}</TableCell>
              <TableCell align="left">
                <Button
                  endIcon={<DeleteIcon />}
                  size="small"
                  color="warning"
                  onClick={() => {
                    setStatus("category-delete");
                    setIsOpen(true);
                    setCategory(row);
                  }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
