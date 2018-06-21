import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: this.props.tracks
    };
  };

  render() {
    return(
      <div className="Playlist">
        <input placeholder="New Playlist" />
        {
          this.state.playlist.map(track => {
            track.addedToPlaylist = true;
          })
        }
        <TrackList tracks={this.props.tracks} removeTrack={this.props.removeTrack} />
        <a className="Playlist-save">Save To Spotify</a>
      </div>
    );
  }
};

export default Playlist;
