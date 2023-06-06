import { useLocation } from "react-router-dom";

const SearchBar = () => {
  let location = useLocation();
  let searchBar;
  if (location.pathname === "/") {
    searchBar = (
      <form action="/" method="get">
        <label htmlFor="header-search">
          <span className="visually-hidden">Search for artists and tracks</span>
        </label>
        <div>
          <input
            type="text"
            id="header-search"
            placeholder="Search for artists and tracks"
            name="s"
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
            name="s"
          />
        </div>
        {/* <p>Or</p> */}
        {/* <button type="submit">Upload your own</button> */}
      </form>
    );
  }

  return <>{searchBar}</>;
};

export default SearchBar;
