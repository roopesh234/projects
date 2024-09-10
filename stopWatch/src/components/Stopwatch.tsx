import { Box, Button, CssBaseline, Typography } from '@mui/material';
import React, { useState, useRef } from 'react';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (time: number) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor((time / 3600000) % 60)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}.${getMilliseconds}`;
  };

  return (
    <div>
      <Box maxWidth="xs"
      sx={{
        margin:20,
        marginLeft:55,
        bgcolor:"black",
        height:300,
        width:400,
        borderRadius:10,
        padding:5,
        boxShadow: 3
        
      }}>
        <CssBaseline />
      <Typography variant="h3" color={'white'} align={'center'}>STOP WATCH</Typography>
      <br/>
      <Typography variant="h4" color={'orange'} align={'center'}>{formatTime(time)}</Typography>
      <br/>
      <Box sx={{
        alignItems:'center'
      }}>
      <Button 
      sx={{ margin: 1,
        marginLeft: 3,
        borderRadius:10,
        bgcolor: "green",
        fontSize:18,
        fontFamily: '"Helvetica Neue"',
        height:80,
        width:80,
       }}
      variant="contained" onClick={start}>Start</Button>
      <Button 
      sx={{ margin: 1,
        borderRadius:10,
        bgcolor:"red",
        fontSize:18,
        fontFamily: '"Helvetica Neue"',
        height:80,
        width:80,
       }}
      variant="contained" onClick={stop}>Stop</Button>
      <Button 
      sx={{ margin: 1,
        borderRadius:10,
        bgcolor:"orange",
        fontSize:18,
        fontFamily: '"Helvetica Neue"',
        height:80,
        width:80,
       }}
      variant="contained" onClick={reset}>Reset</Button>
      </Box>
      </Box>
    </div>
  );
};

export default Stopwatch;
