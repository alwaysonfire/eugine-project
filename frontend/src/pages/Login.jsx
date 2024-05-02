import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/authContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  
  const { login , isLoggedIn } = useAuth();
  
  useEffect(()=> {
    if(isLoggedIn){
        navigate('/');
    }
  },[isLoggedIn])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      if (response.status === 200) {
        const token = response.data.token;
        login(token);
        navigate('/');
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Log In
        </Typography>
        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Log In
          </Button>
        </form>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
