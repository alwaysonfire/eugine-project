import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/authContext';


const Header = () => {
    const {logout , isLoggedIn} = useAuth()
    const handleLogout = () => {
        logout()
    }
  return (
<AppBar position="static" sx={{ bgcolor: '#2196f3' }}>
    <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
            Bulletin Board
        </Typography>
            {isLoggedIn ? (<><Button onClick={handleLogout} color={'inherit'}>
                Logout
            </Button></>) : (<></>) 
            
                }
    </Toolbar>
</AppBar>
  );
};

export default Header;
