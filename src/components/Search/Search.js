import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState([]);

  const onSearch = async () => {
    try {
      const res = await axios.get(`https://http.dog/${filter}.json`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onSave = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      const body = JSON.stringify({ name: 'My List', responseCodes: results });
      await axios.post('/api/lists', body, config);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="search">
      <h2>Search Response Codes</h2>
      <input
        type="text"
        placeholder="Enter filter (e.g., 2xx, 3xx)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
      <button onClick={onSave}>Save</button>
      <div className="results">
        {results.map((result, index) => (
          <div key={index}>
            <img src={result.image} alt={result.code} />
            <p>{result.code}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
