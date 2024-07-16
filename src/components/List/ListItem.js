// ListItem.js
import React from 'react';
import axios from 'axios';

const ListItem = ({ list }) => {
  const onDelete = async () => {
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    await axios.delete(`/api/lists/${list._id}`, config);
  };

  return (
    <div className="list-item">
      <h3>{list.name}</h3>
      <button onClick={onDelete}>Delete</button>
      <div className="images">
        {list.responseCodes.map((code, index) => (
