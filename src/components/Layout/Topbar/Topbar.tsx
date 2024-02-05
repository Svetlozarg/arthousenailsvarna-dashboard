import { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Toolbar,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

        <IconButton
          sx={{ p: 0, pr: 2, color: "common.black" }}
          disableRipple
          onClick={handleClick}
        >
          <Stack justifyContent="center" alignItems="center">
            <AccountCircleIcon sx={{ fontSize: "2.5rem" }} />

            {userName ? (
              <Typography component="p" variant="body1">
                {userName}
              </Typography>
            ) : (
              <Skeleton variant="rounded" width={100} height={20} />
            )}
          </Stack>
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              signOut();
            }}
          >
            <LogoutIcon sx={{ fontSize: "1.5rem", mr: 1 }} />
            Излез
          </MenuItem>
        </Menu>
      </Stack>
    </AppBar>
  );
};

export default Topbar;
