import React, { useState } from 'react';
import './Search.scss';

function Search({ setServices, userId }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/service/searchForServices/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Search failed.');
      }

      const data = await response.json();
      setServices(data); // Update services with the search results
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setInput(searchText);
    handleSearch(searchText); // Trigger search as the user types
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "building mobile app"'
                value={input}
                onChange={handleInputChange} 
              />
            </div>
          </div>
          <div className="popular">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
          </div>
        </div>
        <div className="right">
          <img src="public/img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Search;
