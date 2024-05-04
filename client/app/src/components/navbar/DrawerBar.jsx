import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  Drawer,
  Box,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import LensBlurIcon from "@mui/icons-material/LensBlur";
import ChairIcon from "@mui/icons-material/Chair";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function DrawerBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        sx={{ display: { md: "none", xs: "flex" } }}>
        <MenuIcon />
      </IconButton>

      <Drawer onClose={() => setIsOpen(false)} open={isOpen} anchor="left">
        <Box width={"250px"}>
          <MenuList>
            <MenuItem style={{ margin: "20px  0" }}>
              <ListItemIcon>
                <CheckroomIcon />
              </ListItemIcon>
              <ListItemText>Clothes</ListItemText>
            </MenuItem>
            <MenuItem style={{ margin: "20px  0" }}>
              <ListItemIcon>
                <AppShortcutIcon />
              </ListItemIcon>
              <ListItemText>Electronic</ListItemText>
            </MenuItem>
            <MenuItem style={{ margin: "20px  0" }}>
              <ListItemIcon>
                <LensBlurIcon />
              </ListItemIcon>
              <ListItemText>Accessories</ListItemText>
            </MenuItem>
            <MenuItem style={{ margin: "20px  0" }}>
              <ListItemIcon>
                <ChairIcon />
              </ListItemIcon>
              <ListItemText>Furniture</ListItemText>
            </MenuItem>
            <MenuItem style={{ margin: "20px  0" }}>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText>Cart</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Drawer>
    </>
  );
}
