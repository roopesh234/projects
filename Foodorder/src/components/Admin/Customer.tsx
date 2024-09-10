import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const deleteUser = async (userId: number) => {
    if (localStorage.getItem("login") == null) {
      alert("If you want to enter, please login/register");
      navigate("/login");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      alert("User removed successfully");
      getUsers();
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        All Users
      </Typography>
      <Box my={2}>
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Id: {user.id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Password: {user.password}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type: {user.type}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => deleteUser(user.id)}
                  >
                    Disable
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button variant="outlined" component={Link} to="/admin">
        Back
      </Button>
    </Container>
  );
};

export default Users;