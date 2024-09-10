import React, { useRef } from 'react';
import { Container, TextField, Button } from '@mui/material';


const UseRef: React.FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
    if (inputRef.current) {
        inputRef.current.focus();
        }
    };

    return (
        <Container>
        <h1>useRef Example</h1>
        <TextField
            label="Focus Input"
            variant="outlined"
            inputRef={inputRef}
            fullWidth
            margin="normal"
            />
        <Button variant="contained" color="primary" onClick={focusInput}>
            Focus Input
        </Button>
        </Container>
    );
};

export default UseRef;