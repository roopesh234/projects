import React, { useState, useCallback } from 'react';
import { Container, Button, Typography } from '@mui/material';

const UseCallBack: React.FC = () => {

    const [count, setCount] = useState<number>(0);

    const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
    }, []);

    return (
        <Container>
        <h1>useCallback Example</h1>
        <Button variant="contained" color="primary" onClick={increment}>
            Increment
        </Button>
        <Typography variant="h6">
            Count: {count}
        </Typography>
        </Container>
    );
};

export default UseCallBack;