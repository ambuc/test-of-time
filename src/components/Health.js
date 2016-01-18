'use strict';

import React from 'react';
import Heart from './Heart.js';

export class Health extends React.Component {

  render() {
    var hearts = [];
    for(var i = 0; i < this.props.health; i++){ 
      hearts.push( <Heart key={i} isFull={true}/> );
    }
    for(var i = 0; i < 3 - this.props.health; i++){
      hearts.push( <Heart key={this.props.health + i} isFull={false}/> );
    }
    return (
      <div className='Health'> {hearts} </div>
    );
  }
}

export default Health;
