import React from 'react';
import { Tab, Tabs } from '@mui/material';
import TaskList from './TaskList/TaskList';
import PostageCalculator from './PostageCalculator/PostageCalculator';
import './App.css';

function App() {
  const [selectedTab, setSelectedTab] = React.useState(3);

  const generateTabClass = (tab: number) => {
    const classes = 'navTab ';
    return selectedTab === tab ? classes + 'selectedTab' : classes + 'unselectedTab';
  };

  const handleSelectTab = (event: React.SyntheticEvent, newTab: number) => {
    setSelectedTab(newTab);
  };

  return (
    <div className='content'>
      <div className='title'>Big Boy Task Tracker</div>
      <div className='page'>
        <Tabs onChange={handleSelectTab} className='navBar' value={selectedTab}>
          <Tab label='Task List' className={generateTabClass(0)} />
          <Tab label='Edit List' className={generateTabClass(1)} />
          <Tab label='Battle' className={generateTabClass(2)} />
          <Tab label='Postage Calulator' className={generateTabClass(3)} />
        </Tabs>
        <div role='tabpanel' hidden={selectedTab !== 0}><TaskList /></div>
        <div role='tabpanel' hidden={selectedTab !== 1}>bbb</div>
        <div role='tabpanel' hidden={selectedTab !== 2}>ccc</div>
        <div role='tabpanel' hidden={selectedTab !== 3}><PostageCalculator /></div>
      </div>
    </div>
  );
}

export default App;
