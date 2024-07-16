import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import Lists from './components/Lists';

function App() {
  const [lists, setLists] = useState([]);

  const addToLists = (newList) => {
    setLists([...lists, newList]);
  };

  const updateLists = (updatedLists) => {
    setLists(updatedLists);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search addToLists={addToLists} />} />
        <Route path="/lists" element={<Lists lists={lists} updateLists={updateLists} />} />
      </Routes>
    </div>
  );
}

export default App;
