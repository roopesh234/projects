import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { AES, enc } from "crypto-js";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    
    try {
      const signUpResponse = await
      axios.get('http://localhost:3001/users', {params:{ email }});

      const user = signUpResponse.data[0];

      if(user){
        
        const dePassword = AES.decrypt(user.password,'secret-key').toString(enc.Utf8);

        if(password === dePassword){
          navigate("/home");
        
      } else{
        alert("please enter valid credentials")
      }
    }
  }
     catch (error){
      console.error("error :", error);
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
            alignItems: "center",
          }}
        >
          <Typography variant="h6">WELCOME BACK BUDDY!</Typography>
          <Typography variant="h5">LOGIN</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              sx={{
                borderRadius:'25px'
              }}
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
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
                borderRadius:'25px',
                color: "primary",
                backgroundColor: 'blue',
                '&:hover':{
                  backgroundColor: 'darkblue'
                }
              }}
              
              fullWidth
              variant="contained"
              onClick={handleLogin}
            >
              LOGIN
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? New Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;