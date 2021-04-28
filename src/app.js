import React, { Component } from 'react';
import './style.scss';
import AddNote from './components/insertnote';
import Note from './components/note';
import * as db from './services/datastore';

const { Map } = require('immutable');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: new Map(),
      maxZIndex: 0,
    };
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: new Map(notes) });
    });
  }

  addNote = (t) => {
    const zIdx = this.state.maxZIndex + 1;
    this.setState({ maxZIndex: zIdx });
    const newNote = {
      title: t, text: '', x: 0, y: 0, zIndex: zIdx,
    };
    db.getDB().ref('notes').push(newNote);
  }

  deleteNote = (id) => {
    if (this.state.notes.count() === 1) {
      this.setState({ maxZIndex: 0 });
    }
    db.getDB().ref('notes').child(id).remove();
  }

  updateMap = (id, newNote) => {
    db.getDB().ref('notes').child(id).update(newNote);
  }

  updateZIndex = (newMax) => {
    this.setState({ maxZIndex: newMax });
  }

  getMaxZ = () => {
    let max = 0;
    for (const note of this.state.notes.valueSeq()) {
      if (note.zIndex > max) {
        max = note.zIndex;
      }
    }
    return max;
  }

  render() {
    return (
      <div>
        <h1>NOTES</h1>
        <AddNote addNew={this.addNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return <Note id={id} note={note} delete={this.deleteNote} update={this.updateMap} getMaxZ={this.getMaxZ} updateZIndex={this.updateZIndex} />;
        })}
      </div>
    );
  }
}

export default App;
