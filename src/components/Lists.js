import React from 'react';
import { useNavigate } from 'react-router-dom';

const Lists = ({ lists, updateLists }) => {
  const navigate = useNavigate();

  const handleDeleteItem = (listIndex, code) => {
    const updatedLists = lists.map((list, index) => {
      if (index === listIndex) {
        return {
          ...list,
          codes: list.codes.filter((c) => c !== code),
          images: list.images.filter((img) => !img.includes(code)),
        };
      }
      return list;
    }).filter(list => list.codes.length > 0);

    updateLists(updatedLists);
  };

  return (
    <div>
      <h1>Lists Page</h1>
      {lists.length === 0 ? (
        <p>No lists available</p>
      ) : (
        lists.map((list, index) => (
          <div key={index}>
            <h2>{list.name}</h2>
            <p>Created on: {list.date}</p>
            <div>
              {list.codes.map((code, codeIndex) => (
                <div key={codeIndex}>
                  <p>{code}</p>
                  <img src={list.images[codeIndex]} alt={`HTTP ${code}`} />
                  <button onClick={() => handleDeleteItem(index, code)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Lists;
