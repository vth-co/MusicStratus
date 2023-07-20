import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const history = useHistory();
  const sessionUser = useSelector((state) => state.session?.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);
  // const library = songs.filter((song) => song.userId === sessionUser.id);

  const handlePseudoSubmit = (e) => {
    e.preventDefault();
    history.push(`/login`);
  } 

  // Function to handle search input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle search
  // const handleSearch = () => {
  //   // Perform search logic here based on your requirements
  //   // Update searchResults state with the search results
  //   // For example, you can filter an array of items based on the searchTerm
  //   const filteredResults = library.filter((item) =>
  //     item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setSearchResults(filteredResults);
  // };


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
            // value={searchQuery}
            // onChange={handleInputChange}
          />
        </div>
        {/* <p>Or</p> */}
        {/* <button type="submit">Upload your own</button> */}
      </form>
    );
  } else {
    searchBar = (
      <form action="/" method="get">
        <label htmlFor="header-search">
          <span className="visually-hidden">Search for artists and tracks</span>
        </label>
        <div>
          <input
            type="text"
            id="discover-search"
            placeholder="Search for artists and tracks"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        {/* <p>Or</p> */}
        {/* <button onClick={handleSearch}>Search</button> */}
      </form>
    );
  }

  return <>{searchBar}</>;
};

export default SearchBar;
