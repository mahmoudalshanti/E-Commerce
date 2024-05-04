/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useUserDash } from "../../context/UserProvider";
import { useState } from "react";
import useUpdateUsernameDash from "../../hooks/useUpdateUsernameDash";
import useUpdatePasswordDash from "../../hooks/useUpdatePasswordDash";
import { ErrorDialog, SuccessDialog } from "../admin-dashboard/ResponseDialogs";
import LoadingBtn from "../admin-dashboard/LoadingBtn";

export default function AccountDash() {
  const { user } = useUserDash();
  const [iseOpenUsernameDialog, setIseOpenUsernameDialog] = useState(false);
  const [iseOpenPasswordDialog, setIseOpenPasswordDialog] = useState(false);

  return (
    <>
      <ChangeUsernameDialog
        isOpen={iseOpenUsernameDialog}
        setIseOpen={setIseOpenUsernameDialog}
        user={user}
      />
      <ChangePasswordDialog
        isOpen={iseOpenPasswordDialog}
        setIseOpen={setIseOpenPasswordDialog}
        user={user}
      />
      <Stack
        m={"20px auto"}
        p={1}
        bgcolor={"#eee"}
        width={"50%"}
        justifyContent={"space-evenly"}
        sx={{
          height: "300px",
          "@media (max-width: 700px)": {
            width: "90%",
          },
        }}>
        <Typography textAlign={"center"}>
          Username:{" "}
          <Typography
            variant="caption"
            fontFamily={"muktaB"}
            fontSize={"1.2rem"}
            color={"royalblue"}>
            {user.username}
          </Typography>
        </Typography>
        <Typography textAlign={"center"}>
          Role: Specific{" "}
          <Typography
            fontFamily={"muktaB"}
            fontSize={"1rem"}
            color={"royalblue"}
            variant="caption">
            ({user.role.specific}){" "}
          </Typography>
          , Number{" "}
          <Typography
            fontFamily={"muktaB"}
            fontSize={"1rem"}
            color={"royalblue"}
            variant="caption">
            ({user.role.number}){" "}
          </Typography>
        </Typography>
        <Button
          variant="contained"
          onClick={() => setIseOpenUsernameDialog(true)}
          sx={{ m: "10px auto", mb: "0", width: "50%" }}>
          Change Username
        </Button>
        <Button
          variant="contained"
          onClick={() => setIseOpenPasswordDialog(true)}
          sx={{ m: "10px auto", mb: "0", width: "50%" }}>
          Change Password
        </Button>
      </Stack>
    </>
  );
}

const ChangeUsernameDialog = ({ isOpen, setIseOpen, user }) => {
  const [username, setUsername] = useState(null);
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);

  const { error, isLoading, success, updateUsernameDash } =
    useUpdateUsernameDash();

  const handelUpdateUsernameDash = async () => {
    const data = await updateUsernameDash(username, user.id);

    setUsername(null);
    setIseOpen(false);
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
      <Dialog open={isOpen} onClose={() => setIseOpen(false)} fullWidth>
        <DialogTitle>
          <Typography fontSize={"1.5rem"} fontFamily={"muktaM"}>
            CHANG USERNAME
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="New username"
            margin="normal"
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <Stack m={"25px"}>
          <LoadingBtn
            color={"info"}
            isLoading={isLoading}
            title={"change"}
            func={handelUpdateUsernameDash}
          />
        </Stack>
      </Dialog>
    </>
  );
};

const ChangePasswordDialog = ({ isOpen, setIseOpen, user }) => {
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);
  const { error, success, isLoading, updatePasswordDash } =
    useUpdatePasswordDash();

  const handelUpdatePasswordDash = async () => {
    const data = await updatePasswordDash(password, passwordConfirm, user.id);

    setPassword(null);
    setIseOpen(false);
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
      <Dialog open={isOpen} onClose={() => setIseOpen(false)} fullWidth>
        <DialogTitle>
          <Typography fontSize={"1.5rem"} fontFamily={"muktaM"}>
            CHANG PASSWORD
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="New password"
            margin="normal"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm password"
            margin="normal"
            fullWidth
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </DialogContent>

        <Stack m={"25px"}>
          <LoadingBtn
            color={"info"}
            isLoading={isLoading}
            title={"change"}
            func={handelUpdatePasswordDash}
          />
        </Stack>
      </Dialog>
    </>
  );
};
