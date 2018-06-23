import React from 'react';
import './Track.css';

class Track extends React.Component {
  renderAction = () => {
    return this.props.isRemoval ? '-' : '+';
  };

  addTrack = (e) => {
    e.preventDefault();
    this.props.addTrack(this.props.track);
  };

  removeTrack = (e) => {
    e.preventDefault();
    this.props.onRemove(this.props.track);
  };

  render() {
    const { name, artist, album } = this.props.track;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>{artist} | {album}</p>
        </div>
        <a className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.renderAction()}</a>
      </div>
    );
  }
};

export default Track;
