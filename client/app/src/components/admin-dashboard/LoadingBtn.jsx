/* eslint-disable react/prop-types */
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";

export default function LoadingBtn({ title, color, isLoading, func }) {
  return (
    <>
      {isLoading ? (
        <LoadingButton loading variant="contained" color={color} sx={{ mt: 2 }}>
          {title}
        </LoadingButton>
      ) : (
        <Button
          loading
          variant="contained"
          color={color}
          sx={{ mt: 2 }}
          onClick={func}>
          {title}
        </Button>
      )}
    </>
  );
}
