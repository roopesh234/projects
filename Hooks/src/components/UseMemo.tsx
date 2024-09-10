import React, { useState, useMemo } from 'react';
import { Container, TextField, Typography } from '@mui/material';


const UseMemo: React.FC = () => {

      const [input, setInput] = useState<string>('');
      const [error, setError] = useState<string | null>(null);

      const expensiveCalculation = (input: number): number => {
        console.log('Performing expensive calculation...');
        return input * 1000; 
      };

      const memoizedValue = useMemo(() => {
        try {
          const numericInput = parseFloat(input);
          if (isNaN(numericInput)) {
            throw new Error('Input is not a valid number');
          }
          setError(null);
          return expensiveCalculation(numericInput);
        } catch (error) {
          setError(error.message);
          return 0;
        }
      }, [input]);

      return (
        <Container>
        <h1>useMemo Example</h1>
        <TextField
              label="Input"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              margin="normal"
            />
            {error ? (
        <Typography variant="h6" color="error">
                Error: {error}
        </Typography>
            ) : (
        <Typography variant="h6">
                Memoized Value: {memoizedValue}
        </Typography>
            )}
        </Container>
        );
    };

export default UseMemo;