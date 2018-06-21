import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };
  };

  handleChange = (e) => {
    this.setState ({
      input: e.target.value
    });
  };

  handleSubmit = (e) => {
    this.props.searchSpotify(this.state.input)
    e.preventDefault();
  };

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleChange} placeholder="Enter a Song, Album, or Artist" />
        <a onClick={this.handleSubmit}>Search</a>
      </div>
    );
  }
};

export default SearchBar;
