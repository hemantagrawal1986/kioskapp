import Drawer from '@mui/material/Drawer';
import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { Link } from '@inertiajs/react';

export function AppSideBar(props) {
    const anchor="left";
    const linkset=[
        //{
        //    "name":"Appointment Type",
        //    "link":"/appointment_type/view"
        //},
        {
            "name":"Services",
            "link":"/service/view"
        },
        {
            "name":"Appointment",
            "link":"/appointment/reserve"
        }
    ];

    return(
        <>
           <Drawer
            variant="permanent"
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
                width: props.drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: props.drawerWidth,
                  boxSizing: 'border-box',
                },
            }}
            >
                <List>
                    {linkset.map((linkitem, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton component={Link} to={linkitem.link}>
                                <ListItemText>
                                    {linkitem.name}
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>   
        </>
    ) 
}