import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Badge, Snackbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import CloseIcon from '@mui/icons-material/Close';


const drawerWidth = 240;

const DrawerItems = React.memo(({ handleNavigation }) => (
  <List>
    <ListItem button onClick={() => handleNavigation('/dashboard')}>
      <ListItemIcon><DashboardIcon /></ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={() => handleNavigation('/add-item')}>
      <ListItemIcon><AccountCircleIcon /></ListItemIcon>
      <ListItemText primary="Add New User Data" />
    </ListItem>
    <ListItem button onClick={() => handleNavigation('/fakeapi')}>
      <ListItemIcon><InfoIcon /></ListItemIcon>
      <ListItemText primary="Api Data" />
    </ListItem>
    <ListItem button onClick={() => handleNavigation('/fakeStoreUsers')}>
      <ListItemIcon><AccountCircleIcon /></ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button onClick={() => handleNavigation('/products')}>
      <ListItemIcon><StoreIcon /></ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
  </List>
));

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  const router = useRouter();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setSnackbarMessage(`${product.title} has been added to the cart!`);
    setSnackbarOpen(true);

    setAnimationTrigger(true);
    setTimeout(() => setAnimationTrigger(false), 500);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCartClick = () => {
    setCartDrawerOpen(true);
  };

  const handleCartDrawerClose = () => {
    setCartDrawerOpen(false);
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
          <Typography variant="h6" fontFamily={'Roboto, Arial, sans-serif'}>My Dashboard</Typography>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f4f4f4',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <Divider />
        <DrawerItems handleNavigation={handleNavigation} />
        <Divider />
      </Drawer>
      <Drawer
        className='cart-drawer'
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderLeft: '1px solid #ddd',
            borderRadius: '4px',
            right: 0,
            top: 0,
            bottom: 0,
          },
        }}
        variant="persistent"
        anchor="right"
        open={cartDrawerOpen}
        onClose={handleCartDrawerClose}
      >
        <Toolbar />
        <div style={{ padding: '16px', position: 'relative' }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCartDrawerClose}
            style={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>Shopping Cart</Typography>
          {cart.length === 0 ? (
            <Typography>No items in the cart.</Typography>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ marginBottom: '16px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="textSecondary">${item.price}</Typography>
              </div>
            ))
          )}
        </div>
      </Drawer>
      <main
        className="box1"
        style={{
          flexGrow: 1,
          padding: '24px',
          marginLeft: open ? drawerWidth : 0,
          transition: 'margin 0.3s ease',
        }}
      >
        <Toolbar />
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { handleAddToCart })
        )}
      </main>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      {animationTrigger && (
        <div className="cart-animation" style={{ top: 0, right: 0 }}>
          <ShoppingCartIcon />
        </div>
      )}
    </div>
  );
};

export default Layout;
