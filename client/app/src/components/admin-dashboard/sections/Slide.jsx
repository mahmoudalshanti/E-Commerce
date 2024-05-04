import {
  Button,
  Card,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import ec1 from "../../../Images/e-1.jpg";
import { useState } from "react";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function Slide() {
  const [qu, setQu] = useState();
  return (
    <Container maxWidth={"100%"}>
      <Stack direction={"column"}>
        <Button
          color="success"
          sx={{
            width: "fit-content",
            ml: "auto",
            mb: 1,
            "@media (max-width:899px)": {
              width: "100%",
              mb: 5,
            },
          }}
          variant="contained">
          Save Change
        </Button>
        <FormControl
          sx={{
            width: "50%",
            mb: 3,
            "@media (max-width:899px)": {
              width: "100%",
            },
          }}>
          <InputLabel id="demo-simple-select-label">Count of Slides</InputLabel>
          <Select
            id="demo-simple-select-label"
            label={"Count of Slides"}
            value={qu}
            onChange={(e) => setQu(e.target.value)}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Grid container mb={3}>
          <Grid md={4} item p={1}>
            <Card>
              <CardMedia src={ec1} component={"img"} height={"200px"} />
            </Card>
          </Grid>
          <Grid md={4} item p={1}>
            <Card>
              <CardMedia src={ec1} component={"img"} height={"200px"} />
            </Card>
          </Grid>
          <Grid md={4} item p={1}>
            <Card>
              <CardMedia src={ec1} component={"img"} height={"200px"} />
            </Card>
          </Grid>
        </Grid>
        <TextField
          sx={{
            width: "50%",
            mb: 2,
            "@media (max-width:899px)": {
              width: "100%",
            },
          }}
          id="outlined-basic"
          placeholder="Number slide you need change"
          variant="outlined"
        />
        <Button
          component="label"
          sx={{
            width: "50%",
            "@media (max-width:899px)": {
              width: "100%",
            },
          }}
          variant="contained"
          startIcon={<CloudUploadIcon />}>
          Upload Image Slider
          <VisuallyHiddenInput type="file" />
        </Button>
      </Stack>
    </Container>
  );
}
