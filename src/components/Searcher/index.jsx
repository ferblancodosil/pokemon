import PropTypes from "prop-types";

function Searcher({ placeholder, onChange }) {
  const handleChange = e => {
    if (onChange) {
      onChange({text: e.target.value})
    }
  };
  return (
    <input placeholder={placeholder} className="u-full-width" type="search" onChange={handleChange}/>
  )

}

Searcher.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Searcher
