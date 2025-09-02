import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];

const DefaultNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDrawer =
    (open: boolean | ((prevState: boolean) => boolean)) => () =>
      setDrawerOpen(open);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDarkModeToggle = () => setDarkMode(!darkMode);

  const drawerContent = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <img
        src="/path-to-drawer-image.jpg"
        alt="Drawer background"
        style={{ display: 'none' }}
      />
      <List>
        {navLinks.map((link) => (
          <ListItem
            key={link.label}
            component={RouterLink}
            to={link.path}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <FormControlLabel
          control={
            <Switch checked={darkMode} onChange={handleDarkModeToggle} />
          }
          label="Dark Mode"
        />
      </Box>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          MyApp
        </Typography>

        {/* Search Bar (hidden on mobile for simplicity) */}
        {!isMobile && (
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{
              mx: 2,
              backgroundColor: 'white',
              borderRadius: 1,
              width: 200,
            }}
          />
        )}

        {/* Desktop Links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                color="inherit"
                component={RouterLink}
                to={link.path}
                sx={{ mx: 1 }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        )}

        {/* User Profile Dropdown */}
        <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
          <Avatar alt="User" src="/path-to-avatar.jpg" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>

        {/* Hamburger Menu for Mobile */}
        {isMobile && (
          <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default DefaultNavbar;
