import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter hook
import { Container, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Import DashboardIcon
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import UserData from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const router = useRouter(); // Initialize useRouter

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleNavigation = (path) => {
    router.push(path); // Use router to navigate to the specified path
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        style={{
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
          transition: 'width 0.3s ease',
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">My Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f4f4f4', // Add background color to the sidebar
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div>
          <Toolbar />
          <Divider />
          <List>
            <ListItem button onClick={() => handleNavigation('/dashboard')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/add-item')}>
              <ListItemIcon><UserData /></ListItemIcon>
              <ListItemText primary="Add New User Data" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/about')}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/settings')}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
      <main
      className='box1'
        style={{
          flexGrow: 1,
          padding: '24px',
          marginLeft: open ? drawerWidth : 0,
          transition: 'margin 0.3s ease',
          
        }}
      >
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
