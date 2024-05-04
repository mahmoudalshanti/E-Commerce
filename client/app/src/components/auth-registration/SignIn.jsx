/* eslint-disable react/prop-types */
import { Stack, TextField, Typography, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import useLoginDash from "../../hooks/useLoginDash";
import { ErrorDialog } from "../admin-dashboard/ResponseDialogs";
import LoadingBtn from "../admin-dashboard/LoadingBtn";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isErrorOpen, setErrorIsOpen] = useState(false);

  const { error, isLoading, loginDash } = useLoginDash();

  const navigate = useNavigate();
  const handelSignIn = async () => {
    const data = await loginDash(username, password);
    if (data.error) setErrorIsOpen(true);

    if (data.success) navigate("/dash");
  };

  return (
    <>
      {error && (
        <ErrorDialog
          error={error}
          isErrorOpen={isErrorOpen}
          setErrorIsOpen={setErrorIsOpen}
        />
      )}
      <LayoutOfSignIn
        setUsername={setUsername}
        setPassword={setPassword}
        handelSignIn={handelSignIn}
        isLoading={isLoading}
      />
    </>
  );
}

const LayoutOfSignIn = ({
  setUsername,
  setPassword,
  handelSignIn,
  isLoading,
}) => {
  return (
    <Stack
      height={"100vh"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}>
      <Stack
        direction={"column"}
        sx={{
          "@media (max-width: 600px)": {
            width: "95%",
          },
        }}
        width={"50%"}>
        <LockOutlinedIcon
          fontSize="medium"
          sx={{
            margin: "0 auto",
            color: "#fff",
            padding: "7px",
            borderRadius: " 50%",
            bgcolor: "#9c27b0",
          }}
        />
        <Typography textAlign={"center"} fontSize={"2rem"} color={"GrayText"}>
          Sign In to Dashboard
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          size="medium"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          size="medium"
          onChange={(e) => setPassword(e.target.value)}
        />

        <LoadingBtn
          title={"Sign in"}
          color={"info"}
          isLoading={isLoading}
          func={handelSignIn}
        />

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Link
            underline="always"
            fontFamily={"muktaR"}
            sx={{ cursor: "pointer" }}>
            Forget Password ?
          </Link>
          <Link
            underline="always"
            fontFamily={"muktaR"}
            sx={{ cursor: "pointer" }}>
            Dont have an account ?
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};
