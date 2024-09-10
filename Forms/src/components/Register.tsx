import React, { useEffect, useState } from 'react';
import { TextField, FormControl, RadioGroup, FormControlLabel, Radio, Button, MenuItem, Select, InputLabel, Container, Typography, SelectChangeEvent, Box, Checkbox, TableContainer, Table, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

interface RegisterForm {
  id?: string; 
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | null;
  dateOfBirth: Date | null;
  age: number | null;
  maritalStatus: 'Select' | 'Marries' | 'Unmarried' | 'Divorced';
  gender: null | 'male' | 'female' | 'other';
  state: string[];
  distict: string[];
  file: File| null;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: null,
    dateOfBirth: null,
    age: null,
    maritalStatus:'Select',
    gender: null,
    state: [],
    distict: [],
    file : null,
  });

  const state = ['Andhra Pradesh','J&K','Uttar Pradesh','Delhi'];
  const distict = ['Chittoor','Delhi'];
  const [addressValue, setAddressValue] = useState< RegisterForm | null>(null);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const userToEdit = location.state?.user as RegisterForm;

  useEffect(() => {
    if (userToEdit) {
      setForm(userToEdit);
    }
  }, [userToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'firstName' && value.length > 20) {
      error = 'First name cannot exceed 20 characters';
    }

    if (name === 'lastName' && value.length > 15) {
      error = 'Last name cannot exceed 15 characters';
    }

    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email address';
    }

    if (name === 'phoneNumber' && value.length > 10) {
      error = 'Invalid Phone Number';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setForm({
      ...form,
      [name]: name === 'age' ? parseInt(value) : value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string[]>, key : keyof RegisterForm) => {
    setForm({
      ...form,
      [key]: e.target.value as string[],
    });
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]:value,
    })
  }

  const handleDateChange = (date: Date | null) => {
    setForm({
      ...form,
      dateOfBirth: date,
    });
  };

  const handleAddressSubmit = () => {
    setAddressValue(form);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.firstName && !errors.lastName && !errors.email) {
      try {
          
          if (userToEdit) {
            await axios.put(`http://localhost:3001/users/${form.id}`, form);
            alert('User updated successfully!');
          } else {
            await axios.post('http://localhost:3001/users', form);
            alert('User registered successfully!');
          }
          navigate("/viewreg");
      } catch (error) {
        console.error('Error saving form data:', error);
        alert('Failed to submit form');
      }
    } else {
      alert('Please fix the errors in the form before submitting.');
    }
  };  

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            maxWidth: '400px',
            margin: '0 auto',
            boxShadow: 10,
            borderRadius: 2,
            padding: 4,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{
              color: 'Blue',
              fontSize: 27,
            }}
          >
            <b>{userToEdit ? 'UPDATE USER' : 'REGISTRATION FORM'}</b>
          </Typography>
          <FormControl fullWidth margin="normal">
            <TextField
              required
              id="standard-required"
              variant="standard"
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              required
              id="standard-required"
              variant="standard"
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="standard-required"
              variant="standard"
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="standard-required"
              variant="standard"
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber ?? ''}
              onChange={handleInputChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <DatePicker
              id="standard-required"
              selected={form.dateOfBirth}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              placeholderText="DD-MM-YYYY"
              customInput={<TextField label="Date of Birth" fullWidth />}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="standard-required"
              variant="standard"
              label="Age"
              type="number"
              name="age"
              value={form.age ?? ''}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="marital-status-label">Select Marital Status</InputLabel>
            <Select
              id="standard-required"
              variant="standard"
              labelId="marital-status-label"
              name="maritalStatus"
              defaultValue='Select'
              value={form.maritalStatus}
              onChange={handleStatusChange}
              required
            >
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Unmarried">Unmarried</MenuItem>
              <MenuItem value="Divorced">Divorced</MenuItem>
            </Select>
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <Typography
              sx={{
                marginRight: 50
              }}>Gender</Typography>
            <RadioGroup
              name="gender"
              value={form.gender}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <InputLabel>Address</InputLabel>
          <FormControl fullWidth margin="normal">
            <InputLabel id="marital-status-label">Select States</InputLabel>
            <Select
              id="standard-required"
              variant="standard"
              labelId="marital-status-label"
              name="states"
              multiple
              value={form.state}
              onChange={(e) => handleSelectChange(e, 'state')}
              required
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {state.map((s) => (<MenuItem key={s} value={s}>
                <Checkbox checked={form.state.indexOf(s) > -1} />
                  {s}
              </MenuItem>))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="marital-status-label">Select Distict</InputLabel>
            <Select
              id="standard-required"
              variant="standard"
              labelId="marital-status-label"
              name="Distict"
              multiple
              value={form.distict}
              onChange={(e) => handleSelectChange(e, 'distict')}
              required
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {distict.map((d) => (<MenuItem key={d} value={d}>
                <Checkbox checked={form.distict.indexOf(d) > -1} />
                  {d}
              </MenuItem>))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button variant="contained" color="primary" onClick={handleAddressSubmit} >
                  Add Address
                </Button>
          </FormControl>
          <FormControl fullWidth margin='normal'>
          {addressValue && (
            <TableContainer component={Paper} sx={{
              boxShadow: 10,
              borderRadius: 2
            }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Selected State</TableCell>
                    <TableCell>{addressValue.state.join(', ')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Selected Distict</TableCell>
                    <TableCell>{addressValue.distict.join(', ')}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <FormControl>
            <Typography>Upload File</Typography>
            <Button 
              variant="contained"
              component="label"
              fullWidth>
              Choose File
              <input
              type='file'
              hidden />
            </Button>
          </FormControl>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button type="submit" variant="contained" color="primary">
              {userToEdit ? 'Update' : 'Register'}
            </Button>
          </FormControl>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
