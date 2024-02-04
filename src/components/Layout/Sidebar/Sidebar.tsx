"use client";
import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  Stack,
  ListItemIcon,
} from "@mui/material";
import Topbar from "../Topbar/Topbar";
import Logo from "../Logo/Logo";
import { SIDEBAR_MENU } from "../Routes/SidebarMenu";
import { usePathname } from "next/navigation";
import Link from "next/link";

const styles = {
  drawer: {
    width: 240,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 240,
      boxSizing: "border-box",
    },
  },
};

export const drawerWidth = 240;

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar open={open} handleDrawer={() => setOpen(!open)} />

      <Drawer sx={styles.drawer} variant="persistent" anchor="left" open={open}>
        <Stack
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
          }}
        >
          <Logo />
        </Stack>
        <Divider />
        <List>
          {SIDEBAR_MENU.map((menuItem) => (
            <ListItem
              key={menuItem.title}
              sx={{
                bgcolor:
                  pathname === menuItem.to ? theme.palette.grey[100] : "",
              }}
              disablePadding
            >
              <Link href={menuItem.to} style={{ width: "100%" }}>
                <ListItemButton>
                  <ListItemIcon>{<menuItem.icon />}</ListItemIcon>
                  <ListItemText primary={menuItem.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        sx={{
          mt: "3rem",
          flexGrow: 1,
          padding: theme.spacing(3),
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: `-${drawerWidth}px`,
          ...(open && {
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
