import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchTasks, fetchCompletedTasks, deleteTask, updateTask, completeTask } from '../features/taskSlice';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, TextField, Typography } from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, completedTasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCompletedTasks());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task: Task) => {
    setEditMode(task.id);
    setEditTitle(task.title);
  };

  const handleUpdate = (task: Task) => {
    dispatch(updateTask({ ...task, title: editTitle }));
    setEditMode(null);
    setEditTitle('');
  };

  const handleComplete = (task: Task) => {
    dispatch(completeTask(task));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <Checkbox checked={task.completed} onChange={() => handleComplete(task)} />
            {editMode === task.id ? (
              <TextField value={editTitle} onChange={(e) => setEditTitle(e.target.value)} fullWidth />
            ) : (
              <ListItemText primary={task.title} secondary={`Added: ${new Date(task.createdAt).toLocaleDateString()}`} />
            )}
            <ListItemSecondaryAction>
              {editMode === task.id ? (
                <>
                  <IconButton onClick={() => handleUpdate(task)}>
                    <Save />
                  </IconButton>
                  <IconButton onClick={() => setEditMode(null)}>
                    <Cancel />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={() => handleEdit(task)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(task.id)}>
                    <Delete />
                  </IconButton>
                </>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Typography variant="h4" gutterBottom>
        Completed Tasks
      </Typography>
      <List>
        {completedTasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText primary={task.title} secondary={`Completed: ${new Date(task.completedAt!).toLocaleDateString()}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
