import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import Playlist from './components/Playlist/Playlist.js';
import Spotify from './util/Api.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
      playlist: []
    };
  };


  handleSearchSpotify = (term) => {
    Spotify.getAccessToken();
    Spotify.search(term).then(tracks => this.setState({ tracks: tracks }))

  };

  handleAddToPlaylist = (track) => {
    let newPlaylist = this.state.playlist;
    newPlaylist.push(track);
    this.setState({
      playlist: newPlaylist
    });
  };

  handleRemoveFromPlaylist = (track) => {
    let newPlaylist = this.state.playlist;
    let indexToRemove = newPlaylist.indexOf(track);
    if (indexToRemove > -1) {
      newPlaylist.splice(indexToRemove, 1);
    };
    this.setState({
      playlist: newPlaylist
    });
  };

  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar searchSpotify={this.handleSearchSpotify} />
            <div className="App-playlist">
              <SearchResults tracks={this.state.tracks} addTrack={this.handleAddToPlaylist}/>
              <Playlist tracks={this.state.playlist} removeTrack={this.handleRemoveFromPlaylist} />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
