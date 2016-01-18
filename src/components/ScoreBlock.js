'use strict';

import React from 'react';

export class ScoreBlock extends React.Component {

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
        <div className="ScoreBlock card blue-grey lighten-3">
          <div className="card-content white-text">
            <span className="card-title">Game Over!</span>
            <p className='flow-text'>You placed {this.props.score} events correctly.</p>
          </div>
          <div className='card-action'>
            <a className='btn waves-effect waves-light white blue-text' href='#' onClick={this.handleClick}>Play Again</a>
          </div>
        </div>
    );
  }
}

export default ScoreBlock;
