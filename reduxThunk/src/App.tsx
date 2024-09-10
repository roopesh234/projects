import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Task Manager
        </Typography>
        <TaskForm />
        <TaskList />
      </Box>
    </Container>
  );
};

export default App;
