import { createSlice } from "@reduxjs/toolkit";

const initialState : CounterState = {
    value: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        
        increment : (state) => {
            state.value += 1;
        },
        decrement : (state) => {
            state.value -=1;
        },
        incrementByNumber10 : (state) => {
            state.value += 10;
        },
        incrementByAmount : (state, action) => {
            state.value += action.payload;
        },
        reset : (state) => {
            state.value = 0;
        },
    }
})

export default counterSlice.reducer;
export const { increment, decrement, incrementByAmount, reset, incrementByNumber10 } = counterSlice.actions;