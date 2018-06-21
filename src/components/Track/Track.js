import React from 'react';
import './Track.css';

class Track extends React.Component {

  addRemove = (e) => {
    e.preventDefault();
    this.props.track.addedToPlaylist ? this.props.removeTrack(this.props.track) : this.props.addTrack(this.props.track)
  };

  render() {
    const { title, artist, album, addedToPlaylist } = this.props.track;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{title}</h3>
          <p>{artist}| {album}</p>
        </div>
        <a className="Track-action" onClick={this.addRemove}>{addedToPlaylist ? '-' : '+'}</a>
      </div>
    );
  }
};

export default Track;
