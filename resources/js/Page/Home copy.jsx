import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import Container from '@mui/material/Container';
//import AppSideBar from './AppSideBar'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CssBaseline, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import Typography from '@mui/icons-material/Typography';

export default function Home(props) {
    //const heading = "Laravel 9 Vite  with React JS";
    //return <div> {heading}</div>;
    const drawerWidth=240;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    

    const renderMenu = () => {
      return (
        <React.Fragment key="menuitem">
          <List>
          <ListItem disablePadding> 
            <ListItemButton>
              <ListItemIcon>
                  <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
      </List>
        </React.Fragment>
      )
    }

    return ( 
        
        <Box
            sx={{
              
             
              display:'flex',
              
            }} 
          > 
            <Drawer
              variant="permanent"
              anchor="left"
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              open={true}
              sx={{
                display: {xs:"none",sm:"none",md:"block",lg:"block"},
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
            >
                { renderMenu() }
            </Drawer>
            <Drawer
              variant="temporary"
              onClose={handleDrawerToggle}
              anchor="left"
              open={mobileOpen}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              
              sx={{
                display: { sm:'block',xs:'block' },
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
            >
                { renderMenu() }
            </Drawer>
            <CssBaseline/>
            <Box  sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
              <Paper variant="outlined" square >
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Appointment Manager
                  </Typography>
                  { props.userinfo ? '' :
                  <Button color="inherit">Login</Button>
                  }
                </Toolbar>
              </Paper>

            
            </Box>
            
          </Box>
        
    );
}