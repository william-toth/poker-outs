import React, { Component } from 'react';
import './style.scss';
import ChooseCards from './components/choosecards';
import Results from './components/results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pair: null,
        trips: null,
        quads: null,
        twopair: null,
        fullhouse: null,
        flush: null,
        straight: null,
        results: false,
    }
  }

  calculate = (cards) => {
    const playerCards = cards.slice(0,2);
    const flop = cards.slice(2);
    let turnOut = false;
    if (flop[3][0] == null) flop.pop();
    else turnOut = true;
    let numbers = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "Jack": 0, "King": 0, "Queen": 0, "Ace": 0}
    let suits = {"Clubs": 0, "Hearts": 0, "Diamonds": 0, "Spades": 0}

    for (let card of cards) {
      if (card[0] != null) {
        numbers[card[0]] ++;
        suits[card[1]] ++;
      }
    }

    this.pair(numbers, turnOut);
    this.trips(numbers, turnOut);
    this.quads(numbers,turnOut);
    this.twopair(numbers, turnOut);
    this.fullhouse(numbers,turnOut);
    this.flush(suits, turnOut);
    this.straight(numbers, turnOut);
    this.setState({results: !this.state.results});

  }

  pair = (numbers, turnOut) => {
    let pairOdds = null
    if (Object.values(numbers).includes(2) || Object.values(numbers).includes(3) || Object.values(numbers).includes(4)) {
      pairOdds = 100
    }
    else {
      if (turnOut) pairOdds = 18/46*100;
      else pairOdds = (1-(32/47)*(28/46))*100
    }
    this.setState({pair: Math.round(pairOdds)});
  }

  trips = (numbers, turnOut) => {
    let tripsOdds = null
    if (Object.values(numbers).includes(3) || Object.values(numbers).includes(4)) {
      tripsOdds = 100
    }
    else {
      let numVals = Object.values(numbers)
      let twoCount = 0
      for (let val of numVals) {
        if (val == 2) twoCount ++;
      }
      if (turnOut) {
        if (twoCount == 0) tripsOdds = 0
        else if (twoCount == 1) tripsOdds = 2/46*100;
        else tripsOdds = 4/46*100;
      }
      else {
        if (twoCount == 0) tripsOdds = (15/47)*(2/46)*100;
        else if (twoCount == 1) tripsOdds = (1-(45/47)*(44/46)*(1-(15/47)*(2/46)))*100;
        else if (twoCount == 2) tripsOdds = (1-(43/47)*(42/46)*(1-(15/47)*(2/46)))*100;
      }
    }
    this.setState({trips: Math.round(tripsOdds)});
  }

  quads = (numbers, turnOut) => {
    let quadsOdds = null
    if (Object.values(numbers).includes(4)) {
      quadsOdds = 100
    }
    else {
      let numVals = Object.values(numbers)
      let twoCount = 0
      let threeCount = 0
      for (let val of numVals) {
        if (val == 2) twoCount ++;
        if (val == 3) threeCount ++;
      }
      if (turnOut) {
        if (threeCount == 0) quadsOdds = 0;
        else if (threeCount == 1) quadsOdds = 1/46*100;
        else quadsOdds = 2/46*100;
      } else {
        if (threeCount == 0) {
          if (twoCount == 0) quadsOdds = 0;
          else if (twoCount == 1) quadsOdds = (2/47)*(1/46)*100;
          else quadsOdds = (4/47)*(1/46)*100;
        }
        else {
          if (twoCount == 0) quadsOdds = (1-(46/47)*(45/46))*100;
          if (twoCount == 1) quadsOdds = (1-(46/47)*(45/46) * (1-((2/47)*(1/46))))*100;
        }
      }
      
    }
    this.setState({quads: Math.round(quadsOdds)});
  }

  twopair = (numbers, turnOut) => {
    let twopairOdds = null;
    let numVals = Object.values(numbers)
    let twoCount = 0;
    for (let val of numVals) {
      if (val == 2) twoCount ++;
    }
    if (twoCount >= 2) {
      twopairOdds = 100;
    }
    if (turnOut) {
      if (twoCount == 0) twopairOdds = 0;
      if (twoCount == 1) twopairOdds = (12/46)*100
    } else {
      if (twoCount == 0) twopairOdds = (15/47)*(12/46)*100
      if (twoCount == 1) twopairOdds = (1-(38/47)*(34/46))*100
    }
    this.setState({twopair: Math.round(twopairOdds)})
  }

  fullhouse = (numbers, turnOut) => {
    let fullhouseOdds = null;
    let numVals = Object.values(numbers)
    let twoCount = 0;
    let threeCount = 0;
    for (let val of numVals) {
      if (val == 2) twoCount ++;
      if (val == 3) threeCount ++;
    }
    if (twoCount >= 1 && threeCount >= 1 ) {
      fullhouseOdds = 100;
    }
    else if (turnOut) {
      if (threeCount == 2) fullhouseOdds = 100;
      if (threeCount == 1) fullhouseOdds = (9/46)*100;
      if (threeCount == 0) {
        if (twoCount == 2) fullhouseOdds = (4/46)*100;
        else fullhouseOdds = 0;
      }
    }
    else {
      if (threeCount == 1) {
        fullhouseOdds = (1-(41/47)*(37/46))*100;
      } else {
        if (twoCount == 0) fullhouseOdds = 0;
        if (twoCount == 1) fullhouseOdds = (1-(1-((9/47)*(4/46)))*(1-((4/47)*(9/46))))*100;
        if (twoCount == 2) fullhouseOdds = (1-(43/47)*(44*46)*(1-((3/47)*(2/46))))*100;
      }
    }
    this.setState({fullhouse: Math.round(fullhouseOdds)});
  }

  straight = (numbers, turnOut) => {
    let mapping = {"2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "Jack": 11, "Queen": 12, "King": 13, "Ace": 14}
    let res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    let straightOdds = null;
    for (let el of Object.keys(numbers)) {
      if (numbers[el] > 0) res[mapping[el]-1] = 1;
    }
    if (res[13]==1) res[0] = 1;
    let idx = []
    for (let i = 0; i < 10; i++) {
      let num1s = 0;
      let zeroidx = null;
      for (let j = i; j < i + 5; j++ ) {
        if (res[j] == 1) num1s++;
        else zeroidx = j;
      }
      if (num1s == 4 && (idx.length == 0 || !idx.includes(zeroidx))) {
        idx.push(zeroidx)
      }
    }
    if (turnOut) {
      if (idx.length == 0) straightOdds = 0;
      else if (idx.length == 1) straightOdds = (4/46)*100;
      else if (idx.length == 2) straightOdds = (8/46) * 100;
    } else {
      if (idx.length == 1) straightOdds = (1-(43/47)*(42/46))*100;
      else if (idx.length == 2) straightOdds = (1-(39/47)*(38/46))*100;
    }
    this.setState({straight: Math.round(straightOdds)})
  }

  flush = (suits, turnOut) => {
    let flushOdds = null;
    let maxSuit = 0;
    let suitVals = Object.values(suits);
    for (let val of suitVals) {
      if (val > maxSuit) maxSuit = val;
    }
    if (maxSuit >= 5) flushOdds = 100;
    else if (maxSuit < 3) flushOdds = 0;
    else if (turnOut) {
      if (maxSuit == 3) flushOdds = 0;
      if (maxSuit == 4) flushOdds = (9/46)*100;
    } else {
      if (maxSuit == 3) flushOdds = ((10/47)*(9/46))*100;
      if (maxSuit == 4) flushOdds = (1-(38/47)*(37/46))*100;
    }
    this.setState({flush: Math.round(flushOdds)});
  }

  goBack = () => {
    this.setState({pair: null, trips: null, quads: null, twopair: null,
      fullhouse: null, flush: null, straight: null, results: false,})
  }

  render () {
    return (
      <div>
        <h1>Poker Outs</h1>
        {!this.state.results && <ChooseCards submit = {this.calculate}/>}
        {this.state.results && <Results goBack={this.goBack} pair={this.state.pair} trips={this.state.trips} quads={this.state.quads}
          twopair={this.state.twopair} fullhouse={this.state.fullhouse} flush={this.state.flush} straight={this.state.straight} />}
      </div>
    )
  }
}

export default App;
