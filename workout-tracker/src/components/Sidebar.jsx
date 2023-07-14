import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutIcon from '@mui/icons-material/Logout';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import Cookies from "universal-cookie";
import _ from "lodash";
import axios from 'axios';
const cookies = new Cookies();


const drawerWidth = 240;




export default function Sidebar() {






  function Logout() {
    cookies.remove("TOKEN", { path: "/" });   
    cookies.remove("NAME", { path: "/" });  
    window.location.href = "/login"; 
  }

  function handleNav(eve) {  
    window.location.href = _.kebabCase(eve.target.innerText);
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {['Dashboard', 'Workout Logs', 'Edit Workouts'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={handleNav}>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <DashboardIcon /> : index === 1 ? <HistoryToggleOffIcon /> : <EditNoteIcon />}
              </ListItemIcon>
              <Typography variant='h6'>
                {text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem key={text} disablePadding  onClick={Logout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <Typography variant='h6'>
                {text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );


  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{marginLeft: 'auto'}}>
            Welcome, {cookies.get("NAME")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs:'none', sm: 'none', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
