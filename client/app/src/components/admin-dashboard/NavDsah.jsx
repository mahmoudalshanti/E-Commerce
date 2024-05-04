import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useUserDash } from "../../context/UserProvider";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavDash() {
  const [active, setActive] = useState("dash");
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useUserDash();
  const navigate = useNavigate();

  if (!active) {
    setActive(
      location?.pathname?.split("/")[2] === "account" ? "account" : "dash"
    );
  }

  const handleChange = (event, nextView) => {
    setActive(nextView);
  };
  useEffect(() => {
    setActive(
      location?.pathname?.split("/")[2] === "account" ? "account" : "dash"
    );
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              {user.username}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                  sx={{ p: 0 }}>
                  <Avatar>{user?.username[0]?.toUpperCase()}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}>
                <MenuItem
                  onClick={() => setAnchorElUser(null)}
                  sx={{ "&:hover": { bgcolor: "#fff" }, p: 1 }}>
                  <ToggleButtonGroup
                    orientation="vertical"
                    value={active}
                    exclusive
                    onChange={handleChange}>
                    <ToggleButton
                      value="account"
                      onClick={() => navigate("/dash/account")}
                      sx={{ border: "none", mb: 1 }}>
                      Account
                    </ToggleButton>
                    <ToggleButton
                      value="dash"
                      onClick={() => navigate("/dash")}
                      sx={{ border: "none", mb: 1 }}>
                      Dashboard
                    </ToggleButton>
                    <ToggleButton
                      value="logout"
                      onClick={() => navigate("/dash/logout")}
                      sx={{
                        border: "none",
                      }}>
                      logout
                    </ToggleButton>
                  </ToggleButtonGroup>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
