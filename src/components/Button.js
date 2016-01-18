'use strict';

import React from 'react';

export class Button extends React.Component {

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.index);
  }

  render() {
    return (
        <div className='Button card-panel light-blue white-text valign-wrapper' onClick={this.handleClick}>
          <i className="ButtonIcon material-icons circle white-text valign">subdirectory_arrow_right</i>
        </div>
    );
  }
}

export default Button;
