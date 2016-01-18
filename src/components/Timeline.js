'use strict';

import React from 'react';
import Occurence from './Occurence.js';
import Button from './Button.js';
import BoundaryCard from './BoundaryCard.js';

export class Timeline extends React.Component {

  constructor(props) {
    super(props);

    this.handleSelected = this.handleSelected.bind(this);
  }

  //given an index, evaluates if placing the Prompt at that index in the SortedOccurences array is a valid move.
  //returns nothing, but passes an $isCorrect bool to the TestOfTime handler $onOccurenceGuess
  handleSelected(index) {
    var len = this.props.sortedOccurences.length;
    var previousYear = (index == 0  ) ? -5000 : parseInt(this.props.sortedOccurences[index-1].year);
    var nextYear     = (index == len) ?  5000 : parseInt(this.props.sortedOccurences[index  ].year);
    var isCorrect = _.inRange(this.props.promptYear, previousYear, nextYear);
    this.props.onOccurenceGuess(isCorrect);
  }

  render() {
    var occurenceElements = _.map(this.props.sortedOccurences, (occurence, index) => {
        return <Occurence key={occurence.year} index={index} onSelected={this.handleSelected} inPlay={this.props.inPlay} {...occurence}/>
      });

    occurenceElements.push(<Occurence key={3000} index={this.props.sortedOccurences.length} onSelected={this.handleSelected} inPlay={this.props.inPlay}/>);

    return (
        <div className='Timeline'>
          {this.props.inPlay ? <BoundaryCard text={'The Beginning Of Time'} year={-5000}/> : '' }
          {occurenceElements}
          {this.props.inPlay ? <BoundaryCard text={'The Present Day'} year={5000}/> : '' }
        </div>
    );
  }
}

export default Timeline;
