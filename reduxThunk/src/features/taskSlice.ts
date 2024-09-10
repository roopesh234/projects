import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

interface TaskState {
  tasks: Task[];
  completedTasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  completedTasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:3000/tasks');
  return response.data;
});

export const fetchCompletedTasks = createAsyncThunk('tasks/fetchCompletedTasks', async () => {
  const response = await axios.get('http://localhost:3000/completedTasks');
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'id' | 'createdAt'>) => {
  const response = await axios.post('http://localhost:3000/tasks', {
    ...task,
    createdAt: new Date().toISOString(),
  });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
  await axios.delete(`http://localhost:3000/tasks/${id}`);
  return id;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task) => {
  const response = await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
  return response.data;
});

export const completeTask = createAsyncThunk('tasks/completeTask', async (task: Task) => {
  const updatedTask = { ...task, completed: true, completedAt: new Date().toISOString() };
  await axios.delete(`http://localhost:3000/tasks/${task.id}`);
  const response = await axios.post('http://localhost:3000/completedTasks', updatedTask);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchCompletedTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.completedTasks = action.payload;
      })
      .addCase(fetchCompletedTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        state.completedTasks.push(action.payload);
      });
  },
});

export default taskSlice.reducer;
