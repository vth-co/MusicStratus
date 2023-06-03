const SearchBar = () => (
    <form action="/" method="get" className="searchbar">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search for artists and tracks</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search for artists and tracks"
            name="s" 
        />
        <p>Or</p>
        {/* <button type="submit">Upload your own</button> */}
    </form>
);

export default SearchBar;
