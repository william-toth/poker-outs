import React, { Component } from 'react';
import '../style.scss';

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

    // eslint-disable-next-line class-methods-use-this
    onTitleChange = (event) => {
      this.setState({ content: event.target.value });
    }

    onAdd = () => {
      if (this.state.content.length > 10) {
        alert('Please enter a title of at most 10 characters');
      } else {
        this.props.addNew(this.state.content);
        this.setState({ content: '' });
      }
    }

    clear = () => {
      this.props.clear();
    }

    render() {
      return (
        <div className="add-note-holder">
          <input
            onChange={this.onTitleChange}
            className="add-note"
            value={this.state.content}
            id="add-note"
            placeholder="note title"
          />
          <button type="button" className="label-names" onClick={this.onAdd}>Add Note</button>
          <button type="button" className="label-names" onClick={this.clear}>Clear Notes</button>
        </div>
      );
    }
}

export default AddNote;
