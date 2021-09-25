import React, { Component } from 'react';
import './style.scss';
import Header from './components/header';
import GridNode from './components/gridnode';
import * as db from './services/datastore';
import Board from './components/board';

class App extends Component {
  constructor(props) {
    super(props);
    let arr = [[],[],[],[],[],[],[],[]]
    for (let i = 0; i < 8; i++) {
      if (i % 2 == 0) {
        arr[1].push({sqColor: "black", color: "black", piece: "pawn", coords: [i,1]});
        arr[6].push({sqColor: "white", color: "white", piece: "pawn", coords: [i,6]});
      } else {
        arr[1].push({sqColor: "white", color: "black", piece: "pawn", coords: [i,1]});
        arr[6].push({sqColor: "black", color: "white", piece: "pawn", coords: [i,6]});
      }
      for (let j = 2; j < 6; j++) {
        if ((i + j)%2 == 0) {
          arr[j].push({sqColor: 'white', color: null, piece: null, coords: [i,j]})

        } else {
          arr[j].push({sqColor: 'black', color: null, piece: null, coords: [i,j]})
        }
      }
      if (i==0) {
        arr[0].push({sqColor: "white", color: "black", piece: "rook", coords: [i,0]});
        arr[7].push({sqColor: "black", color: "white", piece: "rook", coords: [i,7]});
      } else if (i==7) {
        arr[0].push({sqColor: "black", color: "black", piece: "rook", coords: [i,0]});
        arr[7].push({sqColor: "white", color: "white", piece: "rook", coords: [i,7]});
      } else if (i==1) {
        arr[0].push({sqColor: "black", color: "black", piece: "knight", coords: [i,0]});
        arr[7].push({sqColor: "white", color: "white", piece: "knight", coords: [i,7]});
      } else if (i==6) {
        arr[0].push({sqColor: "white", color: "black", piece: "knight", coords: [i,0]});
        arr[7].push({sqColor: "black", color: "white", piece: "knight", coords: [i,7]});
      } else if (i==2) {
        arr[0].push({sqColor: "white", color: "black", piece: "bishop", coords: [i,0]});
        arr[7].push({sqColor: "black", color: "white", piece: "bishop", coords: [i,7]});
      } else if (i==5) {
        arr[0].push({sqColor: "black", color: "black", piece: "bishop", coords: [i,0]});
        arr[7].push({sqColor: "white", color: "white", piece: "bishop", coords: [i,7]});
      } else if (i==3) {
        arr[0].push({sqColor: "black", color: "black", piece: "queen", coords: [i,0]});
        arr[7].push({sqColor: "white", color: "white", piece: "queen", coords: [i,7]});
      } else {
        arr[0].push({sqColor: "white", color: "black", piece: "king", coords: [i,0]});
        arr[7].push({sqColor: "black", color: "white", piece: "king", coords: [i,7]});
      }
    }
    this.state = {
      whiteTurn: true,
      boardArr: arr,
      // possibleWords: ['boyfriend','direction','strategy','technology','army','camera','freedom','paper','child',
      //   'chemistry','soup','nation','bolt','bat','octopus','dentist','family','fiction','fear','flame',
      //   'flood','gold','grass','grain','grind','force','government','harmony','humor','ink','insurance',
      //   'iron','jelly','judge','knowledge','land','leather','linen','machine','market','meat','milk','money','ornament',
      //   'owner','page','propaganda','poison','polish','prosperity','punishment','reaction','brain','angle','ant','arch','apple',
      //   'cushion','comb','dog','door','drain','ear','egg','eye','structure','tax','tendency','time','thunder','trouble',
      //   'unit','vessel','view','war','wax','weather','wine','wool','sock','square','spring','stem','store','tail','wheel',
      //   'flag','garden','goat','head','horn','island','jewel','knee','map','monkey','office','orange','pipe','umbrella'],
      // grid: [],
      // spymaster: false,
      // score: { red: 9, blue: 8 },
      // gameOver: false,
      // winner: null,

    };
  }

  // componentDidMount() {
  //   db.fetchGrid((newGrid) => {
  //     this.setState({ grid: newGrid });
  //   });

  //   db.fetchScore((newScore) => {
  //     this.setState({ score: newScore });
  //   });
  //   if (this.state.score.red == 0) {
  //     this.setState({ winner: 'Red' });
  //     this.setState({ gameOver: true });
  //   } else if (this.state.score.blue == 0) {
  //     this.setState({ winner: 'Blue' });
  //     this.setState({ gameOver: true });
  //   }
  // }

  // initializeGrid = () => {
  //   if (db.getDB().ref('grid') == null) {
  //     this.randomizeGrid();
  //   }
  // }

  // updateGrid = (newGrid) => {
  //   db.getDB().ref('grid').set(newGrid);
  // }

  // updateScore = (newScore) => {
  //   db.getDB().ref('score').set(newScore);
  // }

  // randomizeGrid = () => {
  //   this.setState({ gameOver: false });
  //   this.setState({ winner: null });
  //   this.setState({ score: { red: 9, blue: 8 } });
  //   this.setState({ spymaster: false });
  //   this.updateScore({ red: 9, blue: 8 });
  //   const seenWords = [];
  //   const newGrid = [];
  //   let red = 9;
  //   let blue = 8;
  //   let black = 8;
  //   for (let i = 0; i < 25; i++) {
  //     let idx = Math.floor(Math.random() * this.state.possibleWords.length);
  //     while (seenWords.includes(this.state.possibleWords[idx])) {
  //       idx = Math.floor(Math.random() * this.state.possibleWords.length);
  //     }
  //     let color = 0;
  //     let colorStr = '';
  //     if (red != 0 && blue != 0 && black != 0) {
  //       color = Math.floor(Math.random() * 3);
  //     } else if (red == 0 && blue != 0 && black != 0) {
  //       color = 1 + Math.floor(Math.random() * 2);
  //     } else if (red != 0 && blue == 0 && black != 0) {
  //       color = 2 * Math.floor(Math.random() * 2);
  //     } else if (red != 0 && blue != 0 && black == 0) {
  //       color = Math.floor(Math.random() * 2);
  //     } else if (blue == 0 && black == 0) {
  //       color = 0;
  //     } else if (red == 0 && black == 0) {
  //       color = 1;
  //     } else if (red == 0 && blue == 0) {
  //       color = 2;
  //     }

  //     if (color == 0) {
  //       red--;
  //       colorStr = '#ef476f';
  //     } else if (color == 1) {
  //       blue--;
  //       colorStr = '#118ab2';
  //     } else {
  //       black--;
  //       colorStr = 'black';
  //     }
  //     const gridObj = {
  //       word: this.state.possibleWords[idx], color: colorStr, clicked: false, toShow: 'black', bomb: false,
  //     };
  //     seenWords.push(this.state.possibleWords[idx]);
  //     newGrid.push(gridObj);
  //   }
  //   console.log(newGrid);
  //   this.updateGrid(newGrid);
  //   // this.reload();
  // }

  // reload = () => {
  //   const gridCopy = this.state.grid;
  //   if (!this.state.spymaster) {
  //     for (const gridNode of gridCopy) {
  //       gridNode.toShow = 'black';
  //     }
  //   } else {
  //     for (const gridNode of gridCopy) {
  //       gridNode.toShow = gridNode.color;
  //     }
  //   }
  //   this.setState({ grid: gridCopy });
  // }

  // switchPositions = () => {
  //   this.setState({ spymaster: !this.state.spymaster });
  //   // this.reload();
  // }

  // getScore = () => {
  //   return this.state.score;
  // }

  // clickButton = (word) => {
  //   if (!this.state.spymaster) {
  //     const gridCopy = this.state.grid;
  //     const scoreCopy = this.state.score;
  //     for (const gridNode of gridCopy) {
  //       if (gridNode.word == word) {
  //         gridNode.clicked = true;
  //         if (gridNode.color == '#ef476f') {
  //           scoreCopy.red--;
  //         } else if (gridNode.color == '#118ab2') {
  //           scoreCopy.blue--;
  //         }
  //       }
  //     }
  //     this.updateGrid(gridCopy);
  //     this.updateScore(scoreCopy);
  //   }
  // }

  movePiece = (x1,y1,x2,y2) => {
    let boardCopy = this.state.boardArr;
    let square = boardCopy[y1][x1];
    boardCopy[y2][x2].color = square.color;
    boardCopy[y2][x2].piece = square.piece;
    boardCopy[y1][x1].color = null;
    boardCopy[y1][x1].piece = null;
    this.setState({boardArr: boardCopy});
  }

  changePiece = (coords) => {
    this.state.boardArr[coords[1]][coords[0]].piece = 'queen';
  }

  // Render these components
  render() {
    // return (
    //   <div>
    //     {this.initializeGrid()}
    //     <Header randomizeGrid={this.randomizeGrid} switch={this.switchPositions} reload={this.reload} getScore={this.getScore} />
    //     {this.state.gameOver && (
    //     <div className="game-over">
    //       <h2>Game Over</h2>
    //       <h3>{this.state.winner} Wins!!</h3>
    //       <h4>Hit regenerate to play again</h4>
    //     </div>
    //     )}
    //     {!this.state.gameOver && (
    //     <div className="grid">
    //       {this.state.grid.map((gridNode) => {
    //         return <GridNode spm={this.state.spymaster} node={gridNode} click={this.clickButton} />;
    //       })}
    //     </div>
    //     )}
    //     <div className="tag">by Will Toth, April 2021</div>
    //   </div>
    // );
    return (
      <div>
        <h1>Chess</h1>
        <Board boardArr={this.state.boardArr} movePiece={this.movePiece} changePiece={this.changePiece} />
      </div>
    )
  }
}

export default App;
