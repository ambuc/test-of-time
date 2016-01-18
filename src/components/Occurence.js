'use strict';

import React from 'react';
import Button from './Button.js';
import EventCard from './EventCard.js';

export class Occurence extends React.Component {

  constructor() {
    super();

    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(index) {
    this.props.onSelected(index);
  }

  render() {
    return (
        <span className='Occurence'>
          { this.props.inPlay ? <Button onClick={this.handleSelected} index={this.props.index}/> : '' }
          { this.props.event && <EventCard text={this.props.event} year={this.props.year} inPlay={this.props.inPlay}/> }
        </span>
    );
  }
}

export default Occurence;
