import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      if (response.status !== 201) {
        throw new Error('Registration failed');
      }
      navigate('/login');
    } catch (error) {
      setError('Existing username / Network Error');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Register
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
            Register
          </Button>
        </form>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Log In
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Register;
