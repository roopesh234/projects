import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';

interface User {
  id: number;
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:5000/users');
      const users = response.data;

      const user = users.find((user) => 
        bcrypt.compareSync(username, user.username)
      );

      if (user && bcrypt.compareSync(password, user.password)) {
        alert('Login successful');
        navigate("/Home")
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  };

  return (
    <div>
      
      <Container maxWidth="xs">
      <CssBaseline />
      <Box
      sx={{
        mt: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center", }}>
      <Typography variant="h5">LOGIN</Typography>

      

      <TextField
          fullWidth
          required
          id="standard-required"
          label="Username"
          defaultValue="Enter Username"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      
      <TextField
      margin="normal"
      required
      fullWidth
      label="Password"
      id="standard-required"
      variant="standard"
      type="password"
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
      }}
      />

      <Button 
      sx={{
        height:50,
        mt:3, mb:2,
        borderRadius:'10px',
        color: "primary",
        backgroundColor: 'blue',
        '&:hover':{
          backgroundColor: 'darkblue'
        }
      }}
      
      fullWidth
      variant="contained"
      onClick={handleLogin}>Login</Button>
      <Grid container justifyContent={"flex-end"}>
              <Grid item>
      <Link to="/register">New User? Register Here</Link>
      </Grid>
      </Grid>
      </Box>
      </Container>
    </div>
  );
};

export default Login;
