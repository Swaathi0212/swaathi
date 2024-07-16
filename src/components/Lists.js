import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Lists = ({ lists, updateLists }) => {
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
      <Link to="/search">Go to Search</Link>
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
                  <img className="dog-image" src={`${list.images[codeIndex]}`} alt={`List Dog Image ${code}`} />
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
