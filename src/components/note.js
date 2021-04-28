import React, { Component } from 'react';
import '../style.scss';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';
import dragImg from '../img/drag.png';
import deleteImg from '../img/delete.png';
import editImg from '../img/edit.png';
import doneImg from '../img/check.png';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      tempContent: '',
    };
  }

  delete = () => {
    this.props.delete(this.props.id);
  }

  renderContent = () => {
    if (this.state.isEditing) {
      return (
        <textarea
          className="note-editor"
          onChange={this.handleTextChange}
        >
          {this.props.note.text}
        </textarea>
      );
    } else {
      return (
        <ReactMarkdown>{this.props.note.text || ''}</ReactMarkdown>
      );
    }
  }

  renderEdit = () => {
    if (this.state.isEditing) {
      return (
        <img className="edit" src={doneImg} onClick={this.toggleEditing} />
      );
    } else {
      return (
        <img className="edit" src={editImg} onClick={this.toggleEditing} />
      );
    }
  }

  handleTextChange = (event) => {
    this.setState({ tempContent: event.target.value });
  }

  toggleEditing = () => {
    if (this.state.isEditing) {
      this.props.update(this.props.id, {
        title: this.props.note.title, text: this.state.tempContent, x: this.props.note.x, y: this.props.note.y, zIndex: 0,
      });
    }
    this.setState({ tempContent: '' });
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleDrag = (e, data) => {
    console.log(this.props.getMaxZ());
    let newZ = this.props.note.zIndex;
    if (this.props.note.zIndex < this.props.getMaxZ()) {
      newZ = this.props.getMaxZ() + 1;
      this.props.updateZIndex(newZ);
    }
    this.props.update(this.props.id, {
      title: this.props.note.title, text: this.props.note.text, x: data.x, y: data.y, zIndex: newZ,
    });
  }

  render() {
    return (
      <Draggable
        handle=".drag"
        defaultPosition={{ x: 0, y: 0 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        grid={[10, 10]}
        onDrag={this.handleDrag}
      >
        <div style={{ zIndex: this.props.note.zIndex }} className="note-holder">
          <div className="note-header">
            <div className="note-title">{this.props.note.title}</div>
            <div>
              {this.renderEdit()}
              <img className="delete" src={deleteImg} onClick={this.delete} />
              <img className="drag" src={dragImg} />
            </div>
          </div>
          <div className="content-div">
            {this.renderContent()}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
