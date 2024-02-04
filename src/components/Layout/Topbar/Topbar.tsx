import { IconButton, Toolbar, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "../Sidebar/Sidebar";

interface TopbarProps {
  open: boolean;
  handleDrawer: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ open, handleDrawer }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
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
      <Toolbar>
        <IconButton color="inherit" onClick={handleDrawer}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
