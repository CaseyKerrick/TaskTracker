import React from 'react';
import TaskList from './TaskList/TaskList';
import NavBar from './NavBar/NavBar';

// type Task = {
//   description: string;
//   active: boolean;
//   frequency: number;
//   dateLastPerformed?: string;
// };

function App() {
  // const tasks: Task[] = [];

  // return (
  //   <div className="App">
  //     <Button variant="contained">Test Test test</Button>
  //   </div>
  // );

  return (
    <div>
      <NavBar></NavBar>
      <TaskList></TaskList>
    </div>
    
  );
}

export default App;
