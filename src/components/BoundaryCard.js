'use strict';

import React from 'react';

export class BoundaryCard extends React.Component {

  render() {
    return (
        <div className="BoundaryCard card-panel blue-grey lighten-5 grey-text">
          <span>
            {this.props.text}
          </span>
        </div>
    );
  }
}

export default BoundaryCard;
