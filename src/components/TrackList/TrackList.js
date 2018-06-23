import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {

  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {return <Track track={track} key={track.id} addTrack={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />})
        }
      </div>
    );
  }
};

export default TrackList;
