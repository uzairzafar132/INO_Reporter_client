import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";



export default function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "darkblue" }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AppsIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BASIC CRUDS UI
          </Typography>
          <div style={{ marginRight: "20px", display: "grid" }}>
            <span style={{ marginTop: "15px" }}>
              <h5>Uzair Zafar</h5>
            </span>

            <span
              style={{
                marginTop: "px",
              }}
            >
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </span>
          </div>
          {/* <Divider orientation="vertical" />
          <br /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
