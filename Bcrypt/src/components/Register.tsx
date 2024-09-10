import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const salt = bcrypt.genSaltSync(10);
    const hashedUsername = bcrypt.hashSync(username, salt);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      await axios.post('http://localhost:5000/users', {
        username: hashedUsername,
        password: hashedPassword,
      });
      alert('User registered successfully');
      navigate("/");
    } catch (error) {
      console.error('Error registering user', error);
      alert('Error registering user');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <Link to="/">Already User?</Link>
    </div>
  );
};

export default Register;
