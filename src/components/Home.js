import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/lists">Lists</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;