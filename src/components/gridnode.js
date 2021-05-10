import React, { Component } from 'react';
import '../style.scss';

class GridNode extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  click = () => {
    this.props.click(this.props.node.word);
  }

  renderButton = () => {
    if (!this.props.node.clicked) {
      return (
        <button className="grid-button" style={{ color: 'black' }} type="button" onClick={this.click.bind()}>{this.props.node.word}</button>
      );
    } else if (this.props.spm) {
      return (
        <button className="grid-button" style={{ color: this.props.node.color }} type="button">{this.props.node.word}</button>
      );
    } else {
      return (
        <button className="grid-button-clicked" style={{ color: 'rgb(60%,60%,60%)', backgroundColor: this.props.node.color }} type="button">{this.props.node.word}</button>
      );
    }
  }

  render() {
    return (
      <div className="button-div">
        {this.renderButton()}
      </div>
    );
  }
}

export default GridNode;
