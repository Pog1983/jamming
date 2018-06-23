import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {
  handleChange = (e) => {
    this.props.updatePlaylistName(e.target.value);
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.onSave();
  };

  render() {
    return(
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleChange}/>
          <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <a className="Playlist-save" onClick={this.handleClick}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
};

export default Playlist;
