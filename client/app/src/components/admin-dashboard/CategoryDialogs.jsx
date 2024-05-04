/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import useCreateNewCategory from "../../hooks/useCreateNewCategory";
import LoadingBtn from "./LoadingBtn";
import { ErrorDialog, SuccessDialog } from "./ResponseDialogs";
import useUpdateDescriptionOfCategory from "../../hooks/useUpdateDescriptionOfCategory";
import useUpdateNameCategory from "../../hooks/useUpdateNameCategory";
import useDeleteCategory from "../../hooks/useDeleteCategory";
import { useUserDash } from "../../context/UserProvider";

// All Category Dialogs
export function CategoryDialog({ isOpen, setIsOpen, status, category }) {
  if (status === "category-add") {
    return <Create setIsOpen={setIsOpen} isOpen={isOpen} category={category} />;
  } else if (status === "category-update-name") {
    return (
      <UpdateName isOpen={isOpen} setIsOpen={setIsOpen} category={category} />
    );
  } else if (status === "category-view-description") {
    return (
      <ViewDescription
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        category={category}
      />
    );
  } else if (status === "category-update-description") {
    return (
      <UpdateDescription
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        category={category}
      />
    );
  } else if (status === "category-delete") {
    return <Delete isOpen={isOpen} setIsOpen={setIsOpen} category={category} />;
  }
}

// Create New Category
const Create = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [branches, setBranches] = useState(null);
  const [sections, setSections] = useState(null);
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);

  const { error, success, isLoading, createNewCategory } =
    useCreateNewCategory();

  const handelCreateNewCategory = async () => {
    const data = await createNewCategory(
      name ? name.trim().toLowerCase() : "",
      description ? description.trim() : "",
      sections ? sections.split(",").map((word) => word?.trim()) : [],
      branches ? branches.split(",").map((word) => word?.trim()) : []
    );

    setName(null);
    setDescription(null);
    setBranches(null);
    setSections(null);
    setIsOpen(false);
    if (data?.error) setErrorIsOpen(true);
    if (data?.success) setSuccessIsOpen(true);
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
            Create New Category
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack direction={"column"}>
            <TextField
              label="Category name"
              variant="outlined"
              margin="normal"
              size="medium"
              helperText="required"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              margin="normal"
              size="medium"
              helperText="required"
              multiline
              onChange={(e) => setDescription(e.target.value)}
            />
            <Typography mt={2} mb={1}>
              Add Branches
            </Typography>
            <TextField
              placeholder="branch1,branch2,#.."
              variant="outlined"
              size="medium"
              helperText="required"
              onChange={(e) => setBranches(e.target.value)}
            />
            <Typography mt={2} mb={1}>
              Add Sections
            </Typography>
            <TextField
              placeholder="section1,section2,#.."
              variant="outlined"
              size="medium"
              helperText="Not required"
              onChange={(e) => setSections(e.target.value)}
            />
            <LoadingBtn
              title={"create"}
              color={"success"}
              isLoading={isLoading}
              func={handelCreateNewCategory}
            />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Update Category Name
const UpdateName = ({ isOpen, setIsOpen, category }) => {
  const { error, success, isLoading, updateName } = useUpdateNameCategory();
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);
  const [name, setName] = useState(null);

  const handelUpdateName = async () => {
    const data = await updateName(name, category.id);

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
            Update Category Name
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color={"firebrick"} mb={2}>
            Warring: Once you change the name of the category products, the
            category name of the product will also be changed to the new name
          </Typography>
          <Stack direction={"column"}>
            <TextField
              label="New category name"
              variant="outlined"
              margin="normal"
              size="medium"
              onChange={(e) => setName(e.target.value)}
            />
            <LoadingBtn
              title={"update"}
              color={"info"}
              isLoading={isLoading}
              func={handelUpdateName}
            />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

// View Category Description
const ViewDescription = ({ isOpen, setIsOpen, category }) => {
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
        <DialogTitle>
          <Typography fontSize={"1.7rem"} fontFamily={"muktaM"}>
            View Description
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>{category?.description}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Update Category Description
const UpdateDescription = ({ isOpen, setIsOpen, category }) => {
  const [description, setDescription] = useState(null);
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);

  const { error, success, isLoading, updateDescription } =
    useUpdateDescriptionOfCategory();

  const handelUpdateDescription = async () => {
    const data = await updateDescription(description, category.id);
    setDescription(null);
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
            Update Description
          </Typography>
          <DialogContent>
            <Stack direction={"column"}>
              <TextField
                label="Update category description"
                variant="outlined"
                margin="normal"
                size="medium"
                multiline
                onChange={(e) => setDescription(e.target.value)}
              />
              <LoadingBtn
                title={"update"}
                color={"info"}
                isLoading={isLoading}
                func={handelUpdateDescription}
              />
            </Stack>
          </DialogContent>
        </DialogTitle>
      </Dialog>
    </>
  );
};

// Delete Category
const Delete = ({ isOpen, setIsOpen, category }) => {
  const [password, setPassword] = useState(null);
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);

  const { error, success, isLoading, deleteCategory } = useDeleteCategory();

  const { user } = useUserDash();

  const handelDelete = async () => {
    const data = await deleteCategory(password, user.id, category.id);

    setPassword(null);
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
            Delete Category
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color={"firebrick"} mb={2}>
            Are you Sure? <br />
            Once you delete the category, the products & sections and branches
            for this category will be deleted. You must check yourself before
            deleting
          </Typography>
          <Stack direction={"column"}>
            <TextField
              placeholder="Your password"
              variant="outlined"
              margin="normal"
              size="medium"
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoadingBtn
              title={"Delete"}
              color={"warning"}
              isLoading={isLoading}
              func={handelDelete}
            />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
