import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
const httpDogBaseUrl = "https://http.dog/";

const responseCodes = [
100,101,102,103,200,201,202,203,204,205,206,207,208,218,226,300,301,302,303,304,305,306,307,308,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,421,420,422,423,424,425,426,428,429,430,431,440,444,449,450,451,460,463,464,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,520,521,522,523,524,525,526,527,529,530,561,598,599,999
];

const Lists = ({ lists, updateLists }) => {
  const [selectedListIndex, setSelectedListIndex] = useState(null);
  const [filter, setFilter] = useState('');
  const [invalidCode, setInvalidCode] = useState(false);

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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setInvalidCode(false);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const code = parseInt(filter, 10);
    if (responseCodes.includes(code)) {
      const updatedLists = lists.map((list, index) => {
        if (index === selectedListIndex) {
          return {
            ...list,
            codes: [...list.codes, code],
            images: [...list.images, `${httpDogBaseUrl}${code}.jpg`]
          };
        }
        return list;
      });
      updateLists(updatedLists);
      setFilter('');
    } else {
      setInvalidCode(true);
    }
  };

  return (
    <div>
      <h1>Lists Page</h1>
      <Link to="/search">Go to Search</Link>
      {lists.length === 0 ? (
        <p>No lists available</p>
      ) : (
        <div>
          {lists.map((list, index) => (
            <div key={index}>
              <h2 onClick={() => setSelectedListIndex(index)} style={{ cursor: 'pointer' }}>{list.name}</h2>
              {selectedListIndex === index && (
                <div>
                  <p>Created on: {list.date}</p>
                  <form onSubmit={handleFilterSubmit}>
                    <label>
                      Add by response codes:
                      <input type="text" value={filter} onChange={handleFilterChange} />
                    </label>
                    <button type="submit">Add</button>
                  </form>
                  {invalidCode && <p>INVALID CODE</p>}
                  <div>
                    {list.codes.map((code, codeIndex) => (
                      <div key={codeIndex}>
                        <p>{code}</p>
                        <img className="dog-image" src={`${httpDogBaseUrl}${code}.jpg`} alt={`HTTP ${code}`} />
                        <button onClick={() => handleDeleteItem(index, code)}>Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lists;
