import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js';

class SearchResults extends React.Component {
  render() {
    return(
        <div className="SearchResults">
          <h2>Results</h2>
          {
            this.props.tracks.map(track => {track.addedToPlaylist = false})
          }
          <TrackList tracks={this.props.tracks} addTrack={this.props.addTrack} />
      </div>
    );
  }
};

export default SearchResults;
