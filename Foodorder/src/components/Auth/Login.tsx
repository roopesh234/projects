import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
  Grid,
  Container,
} from "@mui/material";
import green from "@mui/material/colors/green";

interface LoginProps {
  setIsLogin: (value: number) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const checkLogin = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/users?email=${email}`);
      if (res.data.length === 0) {
        setErrorMessage("Invalid credentials");
        return;
      }

      const user = res.data[0];
      if (user.password === password) {
        localStorage.setItem("login", "1");
        localStorage.setItem("loginid", user.id.toString()); // Ensure id is stored as string
        setIsLogin(1); // Update the login state
        if (user.type === "user") {
          navigate("/FoodItems");
        } else if (user.type === "admin") {
          navigate("/admin");
        }
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Container
        maxWidth="md"
        sx={{
          height: 565,
          width: "100%",
          mt: 5,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <hr />
          {errorMessage && (
            <Typography color="error" gutterBottom>
              {errorMessage}
            </Typography>
          )}
          <Typography variant="h4">
            <b>LOGIN</b>
          </Typography>
          <Box
            sx={{
              mt: 1,
              padding: 5,
              borderRadius: 5,
              boxShadow: 4,
              backdropFilter: "blur(10px)",
              zIndex: 1,
              color: green[900],
              backgroundColor: "white",
            }}
          >
            <TextField
              variant="standard"
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
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              sx={{
                height: 50,
                mt: 3,
                mb: 2,
                borderRadius: "25px",
                color: "primary",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "green",
                },
              }}
              fullWidth
              variant="contained"
              onClick={checkLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">New User? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
