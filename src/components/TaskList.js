import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTask, editTask } from '../redux/actions';
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Checkbox, TextField, Button } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const handleToggle = (id) => {
    dispatch(toggleTask(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditedTaskText(task.text);
  };

  const handleSaveEdit = () => {
    dispatch(editTask(editTaskId, editedTaskText));
    setEditTaskId(null);
    setEditedTaskText('');
  };

  return (
    <List>
      {tasks.map(task => (
        <ListItem key={task.id} dense button>
          {editTaskId === task.id ? (
            <>
              <TextField
                value={editedTaskText}
                onChange={(e) => setEditedTaskText(e.target.value)}
              />
              <Button onClick={handleSaveEdit}>Save</Button>
            </>
          ) : (
            <>
              <Checkbox
                edge="start"
                checked={task.completed}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': task.id }}
                onClick={() => handleToggle(task.id)}
              />
              <ListItemText primary={task.text} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(task)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
