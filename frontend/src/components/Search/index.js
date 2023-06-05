const SearchBar = () => (
  <form action="/" method="get" className="searchbar">
    <label htmlFor="header-search">
      <span className="visually-hidden">Search for artists and tracks</span>
    </label>
    <div className="field-searchbar">
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

export default SearchBar;
