'use strict';

import React from 'react';

export class Heart extends React.Component {

  render() {
    var classString = "Heart material-icons small ";
    classString += this.props.isFull?'green-text':'red-text animated flash infinite';
    return (
      <div className={classString}>
        {this.props.isFull?'favorite':'favorite_border'}
      </div>
    );
  }
}

export default Heart;
