import { Link,usePage } from '@inertiajs/react'
import {AppSideBar as AppSideBar} from './Page/AppSideBar';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import {useEffect,useState,useReducer} from 'react';


export default function Layout({ children }) {
  const drawerWidth=240;
  const {flash}=usePage().props;
  const [open,setOpen]=useState(true);
  
  useEffect(()=>{
    setOpen(true);
  },[flash]);

  function handleCloseAlert()
  {
    setOpen(false)
  }
  
  return (
   
        <Grid container spacing={2}>
            
        
            <AppSideBar drawerWidth={drawerWidth}></AppSideBar>
            
            <Box  sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
            {/*<Box  sx={{ flexGrow: 1 }}>*/}
              <Container fixed sx={{ paddingTop:"40px"}}>

              {(flash.message && (
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleCloseAlert}>
                      <Alert severity={flash.type || "success"} sx={{width:"100%"}}>{flash.message}</Alert>
                    </Snackbar>
                ))}
                {children}
              </Container>
          </Box>
        </Grid>
        
  )
}