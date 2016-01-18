'use strict';

import React from 'react';

export class Prompt extends React.Component {

  render() {
    return (
        <div className="Prompt card-panel blue-grey lighten-5">
          {this.props.event}
        </div>
    );
  }
}

export default Prompt;
