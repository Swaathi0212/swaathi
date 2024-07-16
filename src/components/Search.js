import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
const httpDogBaseUrl = "https://http.dog/";

const responseCodes = [
100,101,102,103,200,201,202,203,204,205,206,207,208,218,226,300,301,302,303,304,305,306,307,308,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,421,420,422,423,424,425,426,428,429,430,431,440,444,449,450,451,460,463,464,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,520,521,522,523,524,525,526,527,529,530,561,598,599,999
];

const getFilteredCodes = (filter) => {
  if (!filter.includes('x')) {
    return responseCodes.filter(code => code.toString() === filter);
  }

  const regex = new RegExp(`^${filter.replace(/x/g, '\\d')}$`);
  return responseCodes.filter(code => regex.test(code.toString()));
};

const Search = ({ addToLists }) => {
  const [filter, setFilter] = useState('');
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [invalidCode, setInvalidCode] = useState(false);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setInvalidCode(false);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const codes = getFilteredCodes(filter);
    if (codes.length === 0) {
      setInvalidCode(true);
      setFilteredCodes([]);
    } else {
      setInvalidCode(false);
      setFilteredCodes(codes);
    }
  };

  const handleSaveList = () => {
    const listName = prompt('Enter a name for the list:');
    if (listName) {
      const newList = {
        name: listName,
        date: new Date().toLocaleString(),
        codes: filteredCodes,
        images: filteredCodes.map(code => `${httpDogBaseUrl}${code}.jpg`)
      };
      addToLists(newList);
      alert('List saved successfully!');
    }
  };

  return (
    <div>
      <h1>Search Page</h1>
      <Link to="/lists">Go to Lists</Link>
      <form onSubmit={handleFilterSubmit}>
        <label>
          Filter by response codes:
          <input type="text" value={filter} onChange={handleFilterChange} />
        </label>
        <button type="submit">Filter</button>
      </form>
      {invalidCode && <p>INVALID CODE</p>}
      <div>
        {filteredCodes.length > 0 && (
          <div>
            <h2>Filtered Images</h2>
            <button onClick={handleSaveList}>Add to List</button>
            <div>
              {filteredCodes.map(code => (
                <div key={code}>
                  <p>{code}</p>
                  <img className="dog-image" src={`${httpDogBaseUrl}${code}.jpg`} alt={`HTTP ${code}`} />
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