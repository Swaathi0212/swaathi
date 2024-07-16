import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const httpDogBaseUrl = "https://http.dog/";

const responseCodes = [
  100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
  300, 301, 302, 303, 304, 305, 307, 308,
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413,
  414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431,
  451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
];

const getFilteredCodes = (filter) => {
  const regex = new RegExp(`^${filter.replace('x', '\\d')}$`);
  return responseCodes.filter(code => regex.test(code.toString()));
};

const Search = ({ addToLists }) => {
  const [filter, setFilter] = useState('');
  const [filteredCodes, setFilteredCodes] = useState([]);
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const codes = getFilteredCodes(filter);
    setFilteredCodes(codes);
  };

  const handleSaveList = () => {
    const newList = {
      name: 'Dog List',
      date: new Date().toLocaleString(),
      codes: filteredCodes,
      images: filteredCodes.map(code => `${httpDogBaseUrl}${code}.jpg`)
    };
    addToLists(newList);
    alert('List saved successfully!');
    navigate('/lists');
  };

  return (
    <div>
      <h1>Search Page</h1>
      <form onSubmit={handleFilterSubmit}>
        <label>
          Filter by response codes:
          <input type="text" value={filter} onChange={handleFilterChange} />
        </label>
        <button type="submit">Filter</button>
      </form>
      <div>
        {filteredCodes.length > 0 && (
          <div>
            <h2>Filtered Images</h2>
            <button onClick={handleSaveList}>Add to List</button>
            <div>
              {filteredCodes.map(code => (
                <div key={code}>
                  <p>{code}</p>
                  <img src={`${httpDogBaseUrl}${code}.jpg`} alt={`HTTP ${code}`} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
