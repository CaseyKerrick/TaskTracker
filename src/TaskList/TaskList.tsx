import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { defaultTaskList, Task } from '../tasks';
import './TaskList.css';


function TaskList() {

  type Align = "left" | "right" | "center" | "inherit" | "justify" | undefined;
  type Column = {
    label: string,
    width: string,
    align: Align,
  };

  const columns: Column[] = [
    { label: 'Name', width: '400px', align: 'left' },
    { label: 'Frequency', width: '100px', align: 'right' },
    { label: 'Last Performed', width: '200px', align: 'right' },
    { label: 'Days Left', width: '100px', align: 'center' }
  ];

  const calculateDaysRemaining = (task: Task) => {
    if (!task.dateLastPerformed) {
      return 0;
    }

    const MS_IN_ONE_DAY = 1000 * 60 * 60 * 24;
    const today = new Date().getTime();

    const dateLastPerformed = new Date(task.dateLastPerformed).getTime();
    const dayDifference = Math.floor(Math.abs((dateLastPerformed - today) / MS_IN_ONE_DAY));

    return task.frequency - dayDifference;
  };

  const colorSelector = (daysRemaining: number, ratio: number, frequency: number): string => {
    let colorScale = [
      '#800080', // purple
      '#fe2626', // red
      '#ff4500', // orange red
      'rgb(255, 165, 0)', // orange
      'rgb(154, 204, 50', // yellow green
      'rgb(92, 172, 92)', // light green
      'rgb(4, 124, 4)', //green
      'rgb(4, 124, 4)', //green
      'rgb(4, 124, 4)', //green
      'rgb(4, 124, 4)', //green
    ];

    if (daysRemaining < 0) {
      return colorScale[0];
    } else if (daysRemaining >= 7) {
      return colorScale[9];
    } else if (frequency < 7) {
      return colorScale[ratio];
    } else {
      return colorScale[daysRemaining];
    }
  };

  const displayDaysRemaining = (daysRemaining: number, frequency: number) => {
    const ratio = Math.floor(daysRemaining / frequency * 10);
    const backgroundColor = colorSelector(daysRemaining, ratio, frequency);
    
    return (<div className='daysRemainingCell' style={{ backgroundColor }}>{daysRemaining > 0 ? daysRemaining : '0'}</div>);
  };

  return (
    <div className='mainList'>
      <br />
      <TableContainer className='taskListContainer'>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className='taskListHeader'
                  key={column.label}
                  style={{ width: column.width }}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { defaultTaskList.map(row => (
              <TableRow key={row.description}>
                <TableCell>{row.description}</TableCell>
                <TableCell align='right'>{row.frequency}</TableCell>
                <TableCell align='right'>{row.dateLastPerformed || 'Never'}</TableCell>
                <TableCell align='center'>{displayDaysRemaining(calculateDaysRemaining(row), row.frequency)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
    </div>
  );
}

export default TaskList;
