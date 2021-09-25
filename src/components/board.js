import React, { Component } from 'react';
import '../style.scss';
import whitepawn from '../img/whitepawn.png';
import blackpawn from '../img/blackpawn.png';
import whitebishop from '../img/whitebishop.png';
import blackbishop from '../img/blackbishop.png';
import whiterook from '../img/whiterook.png';
import blackrook from '../img/blackrook.png';
import whiteknight from '../img/whiteknight.png';
import blackknight from '../img/blackknight.png';
import whiteking from '../img/whiteking.png';
import blackking from '../img/blackking.png';
import whitequeen from '../img/whitequeen.png';
import blackqueen from '../img/blackqueen.png';


class Board extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selected: null,
        selectedColor: null,
        selectedPiece: null,
        turn: "white",
        blackKingPos: [5,0],
        whiteKingPos: [5,7],
      };
    }

    canMoveTo = () => {
        const res = []
        let sc=this.state.selected
        if (this.state.selectedPiece == "pawn") {
            if (this.state.selectedColor == "white") {
                if (sc[1] > 0) {
                    if (this.props.boardArr[sc[1]-1][sc[0]].piece == null) res.push([sc[0], sc[1]-1]);
                    if (sc[0] < 7 && this.props.boardArr[sc[1]-1][sc[0]+1].piece != null) res.push([sc[0]+1, sc[1]-1]);
                    if (sc[0] > 0 && this.props.boardArr[sc[1]-1][sc[0]-1].piece != null) res.push([sc[0]-1, sc[1]-1]);
                }
                if (sc[1]==6 && this.props.boardArr[sc[1]-1][sc[0]].piece == null && this.props.boardArr[sc[1]-2][sc[0]].piece == null) {
                    res.push([sc[0], sc[1]-2]);
                }
            } else {
                if (sc[1] < 7) {
                    if (this.props.boardArr[sc[1]+1][sc[0]].piece == null) res.push([sc[0], sc[1]+1]);
                    if (sc[0] < 7 && this.props.boardArr[sc[1]+1][sc[0]+1].piece != null) res.push([sc[0]+1, sc[1]+1]);
                    if (sc[0] > 0 && this.props.boardArr[sc[1]+1][sc[0]-1].piece != null) res.push([sc[0]-1, sc[1]+1]);
                }
                if (sc[1]==1 && this.props.boardArr[sc[1]+1][sc[0]].piece == null && this.props.boardArr[sc[1]+2][sc[0]].piece == null) {
                    res.push([sc[0], sc[1]+2]);
                }
            }
        } else if (this.state.selectedPiece == "rook") {
            for (let i = sc[0]+1; i < 8; i++) {
                res.push([i,sc[1]]);
                if (this.props.boardArr[sc[1]][i].piece != null) break;
            }
            for (let i = sc[0]-1; i > -1; i--) {
                res.push([i,sc[1]]);
                if (this.props.boardArr[sc[1]][i].piece != null) break;
            }
            for (let i = sc[1]+1; i < 8; i++) {
                res.push([sc[0], i]);
                if (this.props.boardArr[i][sc[0]].piece != null) break;
            }
            for (let i = sc[1]-1; i > -1; i--) {
                res.push([sc[0], i]);
                if (this.props.boardArr[i][sc[0]].piece != null) break;
            }
        } 
        else if (this.state.selectedPiece == "bishop") {
            for (let i = 1; sc[0] + i < 8 && sc[1] + i < 8; i++) {
                res.push([sc[0]+i, sc[1]+i])
                if (this.props.boardArr[sc[1]+i][sc[0]+i].piece != null) break;
            }
            for (let i = 1; sc[0] + i < 8 && sc[1] - i >= 0; i++) {
                res.push([sc[0]+i, sc[1]-i])
                if (this.props.boardArr[sc[1]-i][sc[0]+i].piece != null) break;
            }
            for (let i = 1; sc[0] - i >= 0 && sc[1] + i < 8; i++) {
                res.push([sc[0]-i, sc[1]+i])
                if (this.props.boardArr[sc[1]+i][sc[0]-i].piece != null) break;
            }
            for (let i = 1; sc[0] - i >= 0 && sc[1] - i >= 0; i++) {
                res.push([sc[0]-i, sc[1]-i])
                if (this.props.boardArr[sc[1]-i][sc[0]-i].piece != null) break;
            }
        }
        else if (this.state.selectedPiece == "knight") {
            for (let i = -2; i <= 2; i += 4) {
                for (let j = -1; j <= 1; j += 2) {
                    if (sc[0]+i >= 0 && sc[0]+i < 8 && sc[1]+j >= 0 && sc[1]+j < 8) {
                        res.push([sc[0]+i, sc[1]+j]);
                    }
                    if (sc[0]+j >= 0 && sc[0]+j < 8 && sc[1]+i >= 0 && sc[1]+i < 8) {
                        res.push([sc[0]+j, sc[1]+i]);
                    }
                }
            }
        }
        else if (this.state.selectedPiece == "queen") {
            for (let i = 1; sc[0] + i < 8 && sc[1] + i < 8; i++) {
                res.push([sc[0]+i, sc[1]+i])
                if (this.props.boardArr[sc[1]+i][sc[0]+i].piece != null) break;
            }
            for (let i = 1; sc[0] + i < 8 && sc[1] - i >= 0; i++) {
                res.push([sc[0]+i, sc[1]-i])
                if (this.props.boardArr[sc[1]-i][sc[0]+i].piece != null) break;
            }
            for (let i = 1; sc[0] - i >= 0 && sc[1] + i < 8; i++) {
                res.push([sc[0]-i, sc[1]+i])
                if (this.props.boardArr[sc[1]+i][sc[0]-i].piece != null) break;
            }
            for (let i = 1; sc[0] - i >= 0 && sc[1] - i >= 0; i++) {
                res.push([sc[0]-i, sc[1]-i])
                if (this.props.boardArr[sc[1]-i][sc[0]-i].piece != null) break;
            }
            for (let i = sc[0]+1; i < 8; i++) {
                res.push([i,sc[1]]);
                if (this.props.boardArr[sc[1]][i].piece != null) break;
            }
            for (let i = sc[0]-1; i > -1; i--) {
                res.push([i,sc[1]]);
                if (this.props.boardArr[sc[1]][i].piece != null) break;
            }
            for (let i = sc[1]+1; i < 8; i++) {
                res.push([sc[0], i]);
                if (this.props.boardArr[i][sc[0]].piece != null) break;
            }
            for (let i = sc[1]-1; i > -1; i--) {
                res.push([sc[0], i]);
                if (this.props.boardArr[i][sc[0]].piece != null) break;
            }
        } else if (this.state.selectedPiece == "king") {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (sc[0] + i > -1 && sc[0] + i < 8 && sc[1] + j < 8 && sc[1] + j > -1 && (i != 0 || j != 0)) {
                        res.push([sc[0]+i,sc[1]+j]);
                    }
                }
            }
        }
        return res
    }

    clicked = (square) => {
        if (this.state.turn == square.color) {
            if ((this.state.selected == null && square.piece != null) || (this.state.selected != null && square.color == this.state.selectedColor)) {
                this.setState({selected: square.coords})
                this.setState({selectedColor: square.color})
                this.setState({selectedPiece: square.piece})
        }
        } else if (this.state.selected != null && square.color != this.state.selectedColor) {;
            let canMoveTo = this.canMoveTo();
            let canMove = false;
            for (let coord of canMoveTo) {
                if (square.coords[0] == coord[0] && square.coords[1] == coord[1]) {
                    canMove = true;
                }
            }
            if (canMove) {
                this.props.movePiece(this.state.selected[0],this.state.selected[1],square.coords[0], square.coords[1]);
                if (this.state.selectedPiece == 'king') {
                    if (this.state.selectedColor == 'white') this.setState({whiteKingPos: square.coords});
                    else this.setState({blackKingPos: square.coords});
                }
                if (this.state.selectedPiece == 'pawn' && (square.coords[1] == 0 || square.coords[1] == 7)) {
                    this.props.changePiece(square.coords);
                }
                this.setState({selected: null})
                this.setState({selectedColor: null})
                this.setState({selectedPiece: null})
                if (this.state.turn == "black") this.setState({turn: "white"});
                else this.setState({turn: "black"});
            }
        } 
    }

    renderLine = (line) => {
        return line.map((square) => {
            let piece = null;
            if (square.color == "white") {
                if (square.piece == 'pawn') piece=whitepawn;
                if (square.piece == 'rook') piece=whiterook;
                if (square.piece == 'bishop') piece=whitebishop;
                if (square.piece == 'knight') piece=whiteknight;
                if (square.piece == 'queen') piece=whitequeen;
                if (square.piece == 'king') piece=whiteking;
            } else {
                if (square.piece == 'pawn') piece=blackpawn;
                if (square.piece == 'rook') piece=blackrook;
                if (square.piece == 'bishop') piece=blackbishop;
                if (square.piece == 'knight') piece=blackknight;
                if (square.piece == 'queen') piece=blackqueen;
                if (square.piece == 'king') piece=blackking;
            }
            if (this.state.selected != null && square.coords == this.state.selected) {
                if (square.sqColor == 'white') {
                    if (square.piece==null) {
                        return <div className="selected-square" onClick={() => {this.clicked(square)}} />
                    } else {
                        return (<div className="selected-square" onClick={() => {this.clicked(square)}}>
                            <img className="piece" src={piece}/>
                        </div>)
                    }
                }
                else if (square.sqColor == 'black') {
                    if (square.piece==null) {
                        return <div className="selected-square" onClick={() => {this.clicked(square)}} />
                    } else {
                        return (<div className="selected-square" onClick={() => {this.clicked(square)}}>
                            <img className="piece" src={piece}/>
                        </div>)
                    }
                }
            }
            if (square.sqColor == 'white') {
                if (square.piece==null) {
                    return <div className="white-square" onClick={() => {this.clicked(square)}} />
                } else {
                    return (<div className="white-square" onClick={() => {this.clicked(square)}}>
                        <img className="piece" src={piece}/>
                    </div>)
                }
            }
            else if (square.sqColor == 'black') {
                if (square.piece==null) {
                    return <div className="black-square" onClick={() => {this.clicked(square)}} />
                } else {
                    return (<div className="black-square" onClick={() => {this.clicked(square)}}>
                        <img className="piece" src={piece}/>
                    </div>)
                }
            }
        })
    }

    render () {
        return (
            <div>
                <div className="board">
                    {this.props.boardArr.map((line) => {
                        return this.renderLine(line);
                    })}
                </div>
            </div>
        );
    }

}

export default Board