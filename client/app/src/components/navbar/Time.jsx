/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { useState } from "react";

export default function Time() {
  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const changeTime = (_) => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval((_) => changeTime(), 1000);
  return (
    <>
      <Box
        letterSpacing={5}
        textAlign={"center"}
        sx={{ my: 2 }}
        className="timeBar">
        {currentTime}
      </Box>
    </>
  );
}
