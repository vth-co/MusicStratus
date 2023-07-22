import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handlePseudoSubmit = (e) => {
    e.preventDefault();
    history.push(`/login`);
  } 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      // Redirect to the search results page with the search term as a query parameter
      history.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };


  let location = useLocation();
  let searchBar;
  if (location.pathname === "/") {
    searchBar = (
      <form action="/" method="get" onSubmit={handlePseudoSubmit}>
        <label htmlFor="header-search">
          <span className="visually-hidden">Search for artists and tracks</span>
        </label>
        <div>
          <input
            type="text"
            id="header-search"
            placeholder="Search for artists and tracks"
          />
        </div>
        {/* <p>Or</p> */}
        {/* <button type="submit">Upload your own</button> */}
      </form>
    );
  } else {
    searchBar = (
      <form action="/search" method="get" onSubmit={handleSearch}>
        <label htmlFor="header-search">
          <span className="visually-hidden">Search for artists and tracks</span>
        </label>
        <div>
          <input
            type="text"
            id="discover-search"
            placeholder="Search for artists and tracks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <p>Or</p> */}
        {/* <button type="submit">Search</button> */}
      </form>
    );
  }

  return <>{searchBar}</>;
};

export default SearchBar;
