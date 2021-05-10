import React, { Component } from 'react';
import '../style.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonContent: 'Spymaster',
    };
  }

  generate = () => {
    this.props.randomizeGrid();
    if (this.state.buttonContent == 'Player') {
      this.setState({ buttonContent: 'Spymaster' });
    }
  }

  switch = () => {
    this.props.switch();
    if (this.state.buttonContent == 'Spymaster') {
      this.setState({ buttonContent: 'Player' });
    } else {
      this.setState({ buttonContent: 'Spymaster' });
    }

    // this.props.reload();
  }

  render() {
    return (
      <div className="header">
        <h1>CODENAMES</h1>
        <div className="options">
          <button type="button" className="option" onClick={this.generate}>regenerate</button>
          <div className="score"><span className="red-score">{this.props.getScore().red}</span> - <span className="blue-score">{this.props.getScore().blue}</span></div>
          <button type="button" className="option" onClick={this.switch}>Switch to {this.state.buttonContent}</button>
        </div>
      </div>
    );
  }
}

export default Header;
