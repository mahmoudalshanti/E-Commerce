import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";

export default function SignUp() {
  const [accept, setAccept] = useState(false);
  console.log(accept);

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
          Sign Up to Dashboard
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          size="medium"
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          size="medium"
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          size="medium"
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          size="medium"
        />
        <FormControlLabel
          sx={{ mb: "20px" }}
          label="Want Once you log in, you can sell your products through the platform?"
          control={<Checkbox onChange={(e) => setAccept(e.target.checked)} />}
        />

        <Button variant="contained" fullWidth>
          Sign up
        </Button>
        <Link
          underline="always"
          m={"5px 0 0 auto"}
          fontFamily={"muktaR"}
          sx={{ cursor: "pointer" }}>
          Already have account?
        </Link>
      </Stack>
    </Stack>
  );
}
