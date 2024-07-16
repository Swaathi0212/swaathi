// List.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from './ListItem';

const List = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      const res = await axios.get('/api/lists', config);
      setLists(res.data);
    };

    fetchLists();
  }, []);

  return (
    <div className="lists">
      <h2>Your Lists</h2>
      {lists.map((list) => (
        <ListItem key={list._id} list={list} />
      ))}
    </div>
  );
};

export default List;
