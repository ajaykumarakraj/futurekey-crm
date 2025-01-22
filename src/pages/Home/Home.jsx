import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  CssBaseline,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddIcon from '@mui/icons-material/Add';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableViewSharpIcon from '@mui/icons-material/TableViewSharp';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Help';
import Dashboard from '../../component/Dashboard';
import CustomTable from '../../Table/customtable';
import FormComponent from '../../component/Form';
import WalkUpload from '../../component/WalkUpload';
import ChangePassword from '../../component/ChangePassword';
import ContactSupport from '../../component/ContactSupport';


const drawerWidth = 280;



// Drawer opening and closing styles
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

// Drawer header styling
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  const [isLeadsMenuOpen, setIsLeadsMenuOpen] = useState(false); // State to manage leads sub-menu visibility
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard'); // For active menu highlight

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleListItemClick = (component) => {
    setActiveMenuItem(component); // Set active menu item
    if (component === 'Leads') {
      setIsLeadsMenuOpen(!isLeadsMenuOpen); // Toggle the Leads submenu
    } else {
      setSelectedComponent(component); // Set the selected component for rendering
      setIsLeadsMenuOpen(false); // Close the submenu when navigating to another component
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/sign-in';
  };

  const handleChangePassword = () => {
    setSelectedComponent('ChangePassword');
  };

  const handleContactSupport = () => {
    setSelectedComponent('ContactSupport');
  };

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon sx={{color:"red"}}/> },
    { label: 'Leads', icon: <LeaderboardIcon sx={{color:"red"}} />, isSubMenu: true },
    { label: 'Table', icon: <TableChartIcon /> },
  ];

  const settingsItems = [
    { label: 'Change Password', icon: <SettingsIcon />, action: handleChangePassword },
    { label: 'Contact Support', icon: <SupportIcon />, action: handleContactSupport },
    { label: 'Sign Out', icon: <LogoutIcon />, action: handleLogout },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Enhanced Mini Drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" sx={{ display: open ? 'block' : 'none' }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
  {menuItems.map((item) => (
    <div key={item.label}>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => handleListItemClick(item.label)}
          sx={{
            backgroundColor: activeMenuItem === item.label ? '#e0e0e0' : 'transparent',
          }}
        >
          <ListItemIcon sx={{minWidth:"0"}}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} sx={{ display: open ? 'block' : 'none' }} />
          {item.isSubMenu && (
            <ArrowForwardIosIcon
              sx={{
                fontSize: 14,
                ml: 2,
                transform: isLeadsMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
      {/* Enhanced Submenu */}
      {item.label === 'Leads' && isLeadsMenuOpen && (
        <List component="div"  disablePadding sx={{ ml: open ? 4 : 2,}}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedComponent('CreateForm')}>
              <ListItemIcon>
                <AddIcon sx={{color:"red"}}/>
              </ListItemIcon>
              <ListItemText primary="Create New" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedComponent('WalkUpload')}>
              <ListItemIcon>
                <FormatListBulletedIcon sx={{color:"red"}} />
              </ListItemIcon>
              <ListItemText primary="Wulk Upload" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedComponent('LeadsTable')}>
              <ListItemIcon>
                <TableViewSharpIcon sx={{color:"red"}} />
              </ListItemIcon>
              <ListItemText primary="Leads Table" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </div>
  ))}
</List>

        <Divider />
        <List>
          {settingsItems.map((item) => (
            <ListItem disablePadding key={item.label}>
              <ListItemButton onClick={item.action}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} sx={{ display: open ? 'block' : 'none' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <DrawerHeader />
     
        {selectedComponent === 'CreateForm' && <FormComponent />}
        {selectedComponent === 'LeadsTable' && <CustomTable />}
        {selectedComponent === 'WalkUpload' && <WalkUpload />}
        {selectedComponent === 'Table' && <CustomTable />}
        {selectedComponent === 'ChangePassword' && <ChangePassword />}
        {selectedComponent === 'ContactSupport' && <ContactSupport />}
        {selectedComponent === 'Dashboard' && ( <Dashboard onCardClick={setSelectedComponent} />
)}
      </Box>
    </Box>
  );
}
