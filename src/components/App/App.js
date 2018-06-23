import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Api.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
      searchTerm: ''
    };
  };

  savePlaylist = () => {
    const trackUris = this.state.playlistTracks.map(track => {
      return track.uri
    });
    Spotify.postPlaylist(this.state.playlistName, trackUris);
  };

  updateSearchTerm = (term) => {
    this.setState({
      searchTerm: term
    });
  };

  searchSpotify = () => {
    Spotify.getAccessToken();
    Spotify.search(this.state.searchTerm).then(searchResults => this.setState({ searchResults: searchResults }))
  };

  addTrack = (track) => {
    if (this.state.playlistTracks.find(addedTrack => addedTrack.id === track.id)) {
      return;
    } else {
      let newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({
        playlistTracks: newPlaylist
      });
    };
  };

  removeTrack = (track) => {
    let newPlaylist = this.state.playlistTracks;
    let indexToRemove = newPlaylist.indexOf(track);
    if (indexToRemove > -1) {
      newPlaylist.splice(indexToRemove, 1);
    };
    this.setState({
      playlistTracks: newPlaylist
    });
  };

  updatePlaylistName = (input) => {
    this.setState({
      playlistName: input
    });
  };


  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar updateSearchTerm={this.updateSearchTerm} searchSpotify={this.searchSpotify}/>
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
                updatePlaylistName={this.updatePlaylistName} playlistName={this.state.playlistName} onSave={this.savePlaylist}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
