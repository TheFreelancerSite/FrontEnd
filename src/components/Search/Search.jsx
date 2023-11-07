import React, { useState, useEffect } from 'react';
import './Search.scss';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ServiceCard from '../ServiceCard/ServiceCard';

function Search({ userId }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    deliveryTime: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerms) => {
    if (!userId) {
      setError('User ID is missing.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/service/searchForServices/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchTerms), // Pass the entire searchTerms object
      });

      if (!response.ok) {
        throw new Error('Search failed.');
      }

      const data = await response.json();
      setSearchResults(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSearchClick = () => {
    handleSearch(input);
  };

  useEffect(() => {
    if (userId) {
      handleSearch({}); // Initial search when the component mounts
    }
  }, [userId]);

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          {user.isSeller ? (
            <h1>Find the perfect <span>freelance</span> services for your business</h1>
          ) : (
            <h1>Find the perfect <span>job</span> that matches your expertise.</h1>
          )}
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Search by title'
                value={input.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>
            <div className="searchInput">
              <input
                type="text"
                placeholder='Search by category'
                value={input.category}
                onChange={handleInputChange}
                name="category"
              />
            </div>
            <div className="searchInput">
              <input
                type="text"
                placeholder='Search by description'
                value={input.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div className="searchInput">
              <input
                type="text"
                placeholder='Search by price'
                value={input.price}
                onChange={handleInputChange}
                name="price"
              />
            </div>
            <div className="searchInput">
              <input
                type="text"
                placeholder='Search by delivery time'
                value={input.deliveryTime}
                onChange={handleInputChange}
                name="deliveryTime"
              />
            </div>
            <button onClick={handleSearchClick}>Search</button>
          </div>
        </div>
        <div className="right">
          <img src="public/img/man.png" alt="" />
        </div>
        <div className="popular">
          
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {searchResults.map((result) => (
            <ServiceCard key={result.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
