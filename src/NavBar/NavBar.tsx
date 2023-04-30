import React from 'react';
import { Tab, Tabs } from '@mui/material';
import './NavBar.css';

const NavBar = () => {

  const [selectedTab, setSelectedTab] = React.useState(0);

  const generateTabClass = (tab: number) => {
    return selectedTab === tab ? 'selectedTab' : 'unselectedTab';
  };

  const handleSelectTab = (event: React.SyntheticEvent, newTab: number) => {
    setSelectedTab(newTab);
  };

  return (
    <div className='navBarContainer'>
      <div className='title'>Big Boy Task Tracker</div>
      <div>
        <Tabs value={selectedTab} onChange={handleSelectTab}>
          <Tab label='Task List' className={generateTabClass(0)} />
          <Tab label='Edit List' className={generateTabClass(1)} />
          <Tab label='Battle' className={generateTabClass(2)} />
        </Tabs>
        <div role='tabpanel' hidden={selectedTab !== 0}>aaa</div>
        <div role='tabpanel' hidden={selectedTab !== 1}>bbb</div>
        <div role='tabpanel' hidden={selectedTab !== 2}>ccc</div>
      </div>
    </div>
  );
};

export default NavBar;