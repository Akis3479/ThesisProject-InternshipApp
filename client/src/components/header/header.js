import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


export default function ButtonAppBar() {
  const navigate = useNavigate();


  function logout() {
    localStorage.removeItem('token');
    navigate("/login");


  }
  
  return (
    <Box sx={{ flexGrow: 1, paddingTop: 9 }}>
      <AppBar >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
         
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Internship Application Platform
          </Typography>
            <LogoutIcon fontSize='small'  onClick={() => logout()} size="small"></LogoutIcon>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
