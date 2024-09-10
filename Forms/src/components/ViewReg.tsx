import React, { useEffect, useState , Key } from 'react';
import { AppBar, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface User {
  id: Key | null | undefined;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: number | null;
  dateOfBirth: Date | null;
  age: number | null;
  maritalStatus: 'Select' | 'married' | 'unmarried' | 'divorced';
  gender: 'male' | 'female' | 'other';
  state: string[];
  distict: string[];
}

const ViewReg: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "http://localhost:3001/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleRegister = () => {
    navigate('/');
  };

  const handleEdit = (user: User) => {
    navigate('/', { state: { user } });
  };

  const handleDelete = async (id: Key | null | undefined) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hey, Welcome!
            </Typography>
            <Button onClick={handleRegister} color="inherit">Add User</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <br />
      <br />
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Date of Birth</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Marital Status</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align='center'>State</TableCell>
                <TableCell align='center'>Distict</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{user.firstName}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phoneNumber}</TableCell>
                  <TableCell align="center">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : ''}</TableCell>
                  <TableCell align="center">{user.age}</TableCell>
                  <TableCell align="center">{user.maritalStatus}</TableCell>
                  <TableCell align="center">{user.gender}</TableCell>
                  <TableCell align="center">{user.state}</TableCell>
                  <TableCell align="center">{user.distict}</TableCell>  
                  <TableCell align="center">
                    <IconButton
                      size="medium"
                      edge="start"
                      color="inherit"
                      aria-label="delete button"
                      onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="medium"
                      edge="start"
                      color="inherit"
                      aria-label="edit button"
                      onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ViewReg;