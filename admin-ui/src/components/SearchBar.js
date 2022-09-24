const SearchBar = (props) => {
  return (
    <input
      type="search"
      className="form-control rounded my-4"
     style={{lineHeight:"2rem"}}
      placeholder="Search by name, role or email"
      value={props.text}
      onChange={props.handleChange}
    />
  );
};
export default SearchBar;
