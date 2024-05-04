import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
export const ErrorDialog = ({ error, isErrorOpen, setErrorIsOpen }) => {
  return (
    <Dialog open={isErrorOpen} onClose={() => setErrorIsOpen(false)} fullWidth>
      <DialogTitle>
        <Typography fontSize={"1.7rem"} color={"red"} fontFamily={"muktaM"}>
          Error
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color={"#000"} mb={2}>
          {error}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export const SuccessDialog = ({ success, isSuccessOpen, setSuccessIsOpen }) => {
  return (
    <Dialog
      open={isSuccessOpen}
      onClose={() => setSuccessIsOpen(false)}
      fullWidth>
      <DialogTitle>
        <Typography fontSize={"1.7rem"} color={"green"} fontFamily={"muktaM"}>
          Success
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color={"#000"} mb={2}>
          {success}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
