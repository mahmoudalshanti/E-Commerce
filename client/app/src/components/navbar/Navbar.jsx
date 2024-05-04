import { AppBar, Slide, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import LogoBar from "./LogoBar";
import LinksBar from "./LinksBar";
import SettingsBar from "./SettingsBar";

// eslint-disable-next-line react/prop-types
const HideBarOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({ undefined });

  return (
    <Slide direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
export default function Navbar() {
  return (
    <>
      <HideBarOnScroll>
        <AppBar className="appBar" sx={{ padding: "10px" }}>
          <Toolbar className="appBar">
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
              spacing={2}
              width={"100%"}>
              <LogoBar />
              <LinksBar />
              <SettingsBar />
            </Stack>
          </Toolbar>
        </AppBar>
      </HideBarOnScroll>
      <Toolbar />
    </>
  );
}
