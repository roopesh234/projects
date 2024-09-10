import { Container, IconButton, Typography, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../app/Store';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import RemoveIcon from '@mui/icons-material/Remove';
import { decrement, increment, reset, incrementByAmount, incrementByNumber10 } from '../app/counterSlice';
import { useState } from 'react';

const Counter : React.FC = () => {
    const count = useSelector ((state : RootState) => state.counter.value)
    const dispatch = useDispatch();
    const [number, setNumber] = useState(0);
    const addValue = Number(number)
        

    return(
        <Container >
            <Typography variant='h3'>{count}</Typography>
            <div>
            <IconButton onClick={() => dispatch(increment())} sx={{
                backgroundColor:'green',
                    color:'black',
                    mr: 5
            }}>
                <AddIcon/>
            </IconButton>
            <IconButton onClick={() => dispatch(decrement())} sx={{
                backgroundColor:'red',
                    color:'black',
                    mr: 5
            }}>
                <RemoveIcon/>
            </IconButton>
            <IconButton onClick={() => dispatch(reset())} sx={{
                backgroundColor:'blue',
                    color:'black',
                    mr:5
            }}>
                <RestartAltIcon/>
            </IconButton>
            <Button onClick={() => dispatch(incrementByNumber10())} sx={{
                backgroundColor:'green',
                    color:'black',
            }}>
                +10
            </Button>
            </div>
            <br/>
            <div>
            <TextField 
            type='number'
            value={number}
            onChange={(e) => setNumber(e.target.value) }/>
            <Button onClick={() => dispatch(incrementByAmount(addValue))}>Add amount</Button>
            </div>
        </Container>
        
    );
};

export default Counter;