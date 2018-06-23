import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  handleChange = (e) => {
    this.props.updateSearchTerm(e.target.value);
  };

  handleSearch = (e) => {
    this.props.searchSpotify();
    e.preventDefault();
  };

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter a Song, Album, or Artist" onChange={this.handleChange}/>
        <a onClick={this.handleSearch}>Search</a>
      </div>
    );
  }
};

export default SearchBar;
