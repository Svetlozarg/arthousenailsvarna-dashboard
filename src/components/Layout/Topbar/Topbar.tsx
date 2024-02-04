import { useEffect, useState } from "react";
import {
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "../Sidebar/Sidebar";
import { USERNAME } from "@/helpers/helpers";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "@/services/Auth/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface TopbarProps {
  open: boolean;
  handleDrawer: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ open, handleDrawer }) => {
  const theme = useTheme();
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    if (USERNAME) {
      setUserName(USERNAME);
    }
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: theme.palette.secondary.main,
        height: "80px",
        pt: ".5rem",
        ...(open && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          pr={1}
          gap={2}
        >
          <Stack justifyContent="center" alignItems="center">
            <AccountCircleIcon sx={{ fontSize: "2.5rem" }} />
            <Typography component="p" variant="body1">
              {userName}
            </Typography>
          </Stack>

          <Tooltip title="Излез">
            <IconButton onClick={signOut}>
              <LogoutIcon color="primary" sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default Topbar;
