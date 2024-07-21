import React from 'react';
import Table from './components/Table/Table';
import './App.css';
import Sidebar from './components/Table/Navbar/Navbar';

const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <Table />
    </div>
  );
};

export default App;
