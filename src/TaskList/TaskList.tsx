import React from 'react';
import { List, ListItem } from '@mui/material';
import { defaultTaskList, Task } from '../tasks';
import './TaskList.css';


function TaskList() {

  return (
    <div className='mainList'>
      <List>
        { defaultTaskList.map((task: Task) => (
          <ListItem key={task.description} className='taskItem'>{task.description}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default TaskList;
