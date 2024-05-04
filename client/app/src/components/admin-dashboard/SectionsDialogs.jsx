import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorDialog, SuccessDialog } from "./ResponseDialogs";
import LoadingBtn from "./LoadingBtn";
import { useState } from "react";
import useCreateNewSection from "../../hooks/useCreateNewSection";
import { useCategoriesDash } from "../../context/CategoriesProvider";
import Filter from "../Filter";
import useUpdateSection from "../../hooks/useUpdateSection";

/* eslint-disable react/prop-types */
export default function SectionsDialogs({
  isOpen,
  setIsOpen,
  status,
  category,
  section,
}) {
  if (status === "section-add")
    return (
      <CreateSection
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        category={category}
      />
    );
  else if (status === "section-update")
    return (
      <UpdateSection
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        category={category}
        section={section}
      />
    );
}

const CreateSection = ({ isOpen, setIsOpen }) => {
  const [section, setSection] = useState(null);
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);
  const { categories } = useCategoriesDash();

  const { error, success, isLoading, createNewCategory } =
    useCreateNewSection();

  const handelCreateNewSection = async () => {
    const data = await createNewCategory(section, categorySelected?.id);

    setSection(null);
    setCategorySelected(null);
    setIsOpen(false);
    if (data.error) setErrorIsOpen(true);
    if (data.success) setSuccessIsOpen(true);
  };

  return (
    <>
      {error ? (
        <ErrorDialog
          error={error}
          isErrorOpen={errorIsOpen}
          setErrorIsOpen={setErrorIsOpen}
        />
      ) : (
        success && (
          <SuccessDialog
            success={success}
            isSuccessOpen={successIsOpen}
            setSuccessIsOpen={setSuccessIsOpen}
          />
        )
      )}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
        <DialogTitle>
          <Typography fontSize={"1.7rem"} fontFamily={"muktaM"}>
            Create New Section
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack direction={"column"}>
            <TextField
              label="Section name"
              variant="outlined"
              margin="normal"
              size="medium"
              helperText="required"
              onChange={(e) => setSection(e.target.value)}
            />
            <Filter
              label={"Select Category"}
              option={categories.data}
              setCategorySelected={setCategorySelected}
            />
            <LoadingBtn
              title={"create"}
              color={"success"}
              isLoading={isLoading}
              func={handelCreateNewSection}
            />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

const UpdateSection = ({ isOpen, setIsOpen, category, section }) => {
  const [name, setName] = useState(null);
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);
  const { error, success, isLoading, updateSection } = useUpdateSection();
  const handelUpdateSection = async () => {
    const data = await updateSection(name, section, category.id);

    setName(null);
    setIsOpen(false);
    if (data.error) setErrorIsOpen(true);
    if (data.success) setSuccessIsOpen(true);
  };
  return (
    <>
      {error ? (
        <ErrorDialog
          error={error}
          isErrorOpen={errorIsOpen}
          setErrorIsOpen={setErrorIsOpen}
        />
      ) : (
        success && (
          <SuccessDialog
            success={success}
            isSuccessOpen={successIsOpen}
            setSuccessIsOpen={setSuccessIsOpen}
          />
        )
      )}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
        <DialogTitle>
          <Typography fontSize={"1.7rem"} fontFamily={"muktaM"}>
            Update Section
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack direction={"column"}>
            <TextField
              label="Section name"
              variant="outlined"
              margin="normal"
              size="medium"
              helperText="required"
              onChange={(e) => setName(e.target.value)}
            />

            <LoadingBtn
              title={"create"}
              color={"success"}
              isLoading={isLoading}
              func={handelUpdateSection}
            />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
