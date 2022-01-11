import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import Select from 'react-select';
import '../style.scss';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import Button from 'react-bootstrap/Button';


class ChooseCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cardOptions: [{value: "2", label: "2"}, {value: "3", label: "3"}, {value: "4", label: "4"},
                      {value: "5", label: "5"}, {value: "6", label: "6"}, {value: "7", label: "7"},
                      {value: "8", label: "8"}, {value: "9", label: "9"}, {value: "10", label: "10"},
                      {value: "Jack", label: "Jack"}, {value: "Queen", label: "Queen"}, {value: "King", label: "King"}, {value: "Ace", label: "Ace"}],
        suitOptions: [{value: "Clubs", label: "Clubs"}, {value: "Hearts", label: "Hearts"}, {value: "Spades", label: "Spades"}, {value: "Diamonds", label: "Diamonds"}],
        cards: [[null,null], [null,null], [null,null], [null,null], [null,null], [null,null]],
    };
  }
  
  _onSelect = (v,card,s) => {
    if (v != "Select") {
      let cardsCopy = this.state.cards;
      if (s=="c") cardsCopy[card][0] = v;
      else cardsCopy[card][1] = v;
      this.setState({cards: cardsCopy})
    }
  }
  
  submit = () => {
    let works = true;
    for (let i = 0; i < 5; i ++) {
      if (this.state.cards[i][0] == null || this.state.cards[i][1] == null) {
        works = false
      }
    }
    if ((this.state.cards[5][0] == null && this.state.cards[5][1] != null) || (this.state.cards[5][1] == null && this.state.cards[5][0] != null)) {
      works = false
    }
    if (!works) alert("Please select both suits and numbers for all cards, with the turn card selection being optional");
    else this.props.submit(this.state.cards);
  }

  render() {
    return (
      <div className="large-div">
        <div className="select">
          <div className="card-chunk">
            <h2>Hand</h2>
            <div className="player-cards">
              <div className="indiv-card">
                <Select options={this.state.cardOptions} onChange={(e) => {this._onSelect(e.value,0,"c")}} className="dropdown" placeholder="Number"></Select>
                <Select options={this.state.suitOptions} onChange={(e) => {this._onSelect(e.value,0,"s")}} className="dropdown" placeholder="Suit"/>
              </div>
              <div className="indiv-card">
                <Select options={this.state.cardOptions} onChange={(e) => {this._onSelect(e.value,1,"c")}} className="dropdown" placeholder="Number"/>
                <Select options={this.state.suitOptions} onChange={(e) => {this._onSelect(e.value,1,"s")}} className="dropdown" placeholder="Suit"/>
              </div>
            </div>
          </div>
          <div className="card-chunk">
            <h2>Flop</h2>
            <div className="player-cards">
              <div className="indiv-card">
                <Select options={this.state.cardOptions} onChange={(e) => {this._onSelect(e.value,2,"c")}} className="dropdown" placeholder="Number"/>
                <Select options={this.state.suitOptions} onChange={(e) => {this._onSelect(e.value,2,"s")}} className="dropdown" placeholder="Suit"/>
              </div>
              <div className="indiv-card">
                <Select options={this.state.cardOptions} onChange={(e) => {this._onSelect(e.value,3,"c")}} className="dropdown" placeholder="Number"/>
                <Select options={this.state.suitOptions} onChange={(e) => {this._onSelect(e.value,3,"s")}} className="dropdown" placeholder="Suit"/>
              </div>
              <div className="indiv-card">
                <Select options={this.state.cardOptions} onChange={(e) => {this._onSelect(e.value,4,"c")}} className="dropdown" placeholder="Number"/>
                <Select options={this.state.suitOptions} onChange={(e) => {this._onSelect(e.value,4,"s")}} className="dropdown" placeholder="Suit"/>
              </div>
            </div>
          </div>
          <div className="card-chunk">
            <h2>Turn (optional)</h2>
            <div className="player-cards">
              <div className="indiv-card">
                <Select options={this.state.cardOptions} onChange={(e) => {this._onSelect(e.value,5,"c")}} className="dropdown" placeholder="Number"/>
                <Select options={this.state.suitOptions} onChange={(e) => {this._onSelect(e.value,5,"s")}} className="dropdown"/>
              </div>
            </div>
          </div>
          <div className="button-div">
            <Button className="submit" onClick={() => {this.submit()}}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChooseCards;
