'use strict';

import React from 'react';
import Title from './Title.js';
import Instructions from './Instructions.js';
import Health from './Health.js';
import Prompt from './Prompt.js';
import ScoreBlock from './ScoreBlock.js';
import Timeline from './Timeline.js';
import Credits from './Credits.js';
import occurenceStore from '../stores/occurenceStore.js';

export class TestOfTime extends React.Component {

  constructor() {
    super();

    this.state = {
      health: 3,
      unsortedOccurences: [
        occurenceStore.getRandomOccurence()
      ],
      currentPrompt: occurenceStore.getRandomOccurence(),
      inPlay: true
    }

    this.decrementHealth = this.decrementHealth.bind(this);
    this.handleOccurenceGuess = this.handleOccurenceGuess.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  decrementHealth() {
    if (this.state.health > 0){
      this.setState({ health: this.state.health-1 });
    }
  }

  newGame(){
    occurenceStore.clearCache();
    this.setState({
      health: 3,
      unsortedOccurences: [
        occurenceStore.getRandomOccurence()
      ],
      currentPrompt: occurenceStore.getRandomOccurence(),
      inPlay: true
    });
  }

  handleOccurenceGuess(correct){
    if(!correct){
      this.decrementHealth()
    }
    if(this.state.health <= 0){
      this.setState({inPlay: false});
    } else {
      //get a new prompt
      var copy = this.state.unsortedOccurences;
      copy.push(this.state.currentPrompt);
      this.setState({
        unsortedOccurences: copy,
        currentPrompt: occurenceStore.getRandomOccurence()
      });
    }
  }

  render() {
    var sortedOccurences = _.orderBy(this.state.unsortedOccurences, function(occurence){
      return parseInt(occurence.year)
    });

    return (
      <div className='container'>
        {this.state.inPlay ? <Health health={this.state.health}/> : '' }
        <Title/>
        <Instructions/>
        {this.state.inPlay ? <Prompt event={this.state.currentPrompt.event} year={this.state.currentPrompt.year}/> : '' }
        {this.state.inPlay ? '' : <ScoreBlock score={sortedOccurences.length} onClick={this.newGame} /> }
        <Timeline inPlay={this.state.inPlay} sortedOccurences={sortedOccurences} promptYear={parseInt(this.state.currentPrompt.year)} onOccurenceGuess={this.handleOccurenceGuess} />
        <Credits/>
      </div>
    );
  }
}

export default TestOfTime;
