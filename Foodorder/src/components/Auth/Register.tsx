import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Grid, Box, CssBaseline} from "@mui/material";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const navigate = useNavigate();

    const saveUser = () => {
        if (name.length < 3 || name.length > 8) {
            setError("Name length should be > 3 and < 8");
            alert("Enter proper length");
        } else if (password.length < 3 || password.length > 8) {
            setErrorPassword("Password length should be > 3 and < 8");
            alert("Enter password in proper length");
        } else {
            const user = {
                name,
                email,
                password,
                type: "user"
            };

            axios.post("http://localhost:3000/users", user).then(() => {
                alert("Your registration is completed");
                navigate('/login');
            });
        }
    };

    return (
        <Container maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              mt: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4"><b>REGISTER</b></Typography>
            <Box sx={{ mt: 3,
              padding:5,
              borderRadius : 5,
              boxShadow :4,
            }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                  variant="standard"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={e => setName(e.target.value)}
                    error={!!error}
                    helperText={error}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                  variant="standard"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  variant="standard"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    error={!!errorPassword}
                    helperText={errorPassword}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  height:50,
                  mt:3, mb:2,
                  borderRadius:'25px',
                  color: "primary",
                  backgroundColor: 'black',
                  '&:hover':{
                    backgroundColor: 'blue'
                  }
                }}
                fullWidth
                variant="contained"
                onClick={saveUser}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
            </Box>
          </Box>
        </Container>
    );
};

export default Register;