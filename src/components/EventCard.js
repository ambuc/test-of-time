'use strict';

import React from 'react';

export class EventCard extends React.Component {

  render() {
    var yearString = '';

    if(!this.props.inPlay){
      yearString += _.trimStart(this.props.year, '-0');
      if(this.props.year[0]=='-'){
        yearString+=' B.C.';
      } else {
        yearString+=' A.D.';
      }
    }

    var classString = "EventCard card-panel blue-grey lighten-5 animated rollIn";

    if(!this.props.inPlay){ classString += " relax"; }

    return (
        <div className={classString}>
          { this.props.inPlay ? '' : <h6>{yearString}</h6>}
          {this.props.text}
        </div>
    );
  }
}

export default EventCard;
