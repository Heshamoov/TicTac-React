import React from "react";
import "@fontsource/roboto";
import "./tictactoe.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconeButton from "@material-ui/core/IconButton";
import PlayCircleFilledWhiteOutlinedIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
        </div>
        <div className="board-row">
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
        </div>
        <div className="board-row">
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
        </div>
        <div className="board-row">
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(36).fill(null),
          // squares: [
          //   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
          //   19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
          // ],
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? move : <PlayCircleFilledWhiteOutlinedIcon />;
      return (
        <IconeButton
          aria-label="PlayCircleFilledWhiteOutlinedIcon"
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => this.jumpTo(move)}
          key={move}
        >
          {desc}
        </IconeButton>
      );
    });

    let status;
    if (winner) {
      status = <h3 style={{ color: "green" }}>{winner} is the winner!"</h3>;
    } else {
      status = "Player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-title">
          <h1>TIC TAC TOE</h1>
        </div>

        <div className="game-board">
          <div className="game-squares">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>

          <div className="game-info">
            <div>{status}</div>

            <div className="history">
              <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="vertical outlined primary button group"
              >
                {moves}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squares) {
  const lines = [
    // ALL IN ONE ROW
    [0, 1, 2, 3], //Row 1
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    // [3, 4, 5],

    [6, 7, 8, 9], //Row 2
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    // [9, 10, 11],

    [12, 13, 14, 15], //Row 3
    [13, 14, 15, 16],
    [14, 15, 16, 17],
    // [15, 16, 17],

    [18, 19, 20, 21], //Row 4
    [19, 20, 21, 22],
    [20, 21, 22, 23],
    // [21, 22, 23, 24],

    [24, 25, 26, 27], //Row 5
    [25, 26, 27, 28],
    [26, 27, 28, 29],
    // [27, 28, 29],

    [30, 31, 32, 33], //Row 6
    [31, 32, 33, 34],
    [32, 33, 34, 35],
    // [33, 34, 35],

    // ALL IN ONE COLUMN
    [0, 6, 12, 18], //Column 1
    [6, 12, 18, 24],
    [12, 18, 24, 30],
    // [18, 24, 30],

    [1, 7, 13, 19], //Column 2
    [7, 13, 19, 25],
    [13, 19, 25, 31],
    // [19, 25, 31],

    [2, 8, 14, 20], //Column 3
    [8, 14, 20, 26],
    [14, 20, 26, 32],
    // [20, 26, 32],

    [3, 9, 15, 21], //Column 4
    [9, 15, 21, 27],
    [15, 21, 27, 33],
    // [21, 27, 33],

    [4, 10, 16, 22], //Column 5
    [10, 16, 22, 28],
    [16, 22, 28, 34],
    // [22, 28, 34],

    [5, 11, 17, 23], //Column 6
    [11, 17, 23, 29],
    [17, 23, 29, 35],
    // [23, 29, 35],

    // Right to Left Victor
    [0, 7, 14, 21], // Main Victor
    [7, 14, 21, 28],
    [14, 21, 28, 35],
    // [21, 28, 35],

    [1, 8, 15, 22],
    [8, 15, 22, 29],
    // [15, 22, 29],

    [2, 9, 16, 23],
    // [9, 16, 23],

    // [3, 10, 17],

    [6, 13, 20, 27],
    [13, 20, 27, 34],
    // [20, 27, 34],

    [12, 19, 26, 33],
    // [19, 26, 33],

    // [18, 25, 32],

    // Left to Right Victor
    [5, 10, 15, 20], // Main Victor
    [10, 15, 20, 25],
    [15, 20, 25, 30],
    // [20, 25, 30],

    [4, 9, 14, 19],
    [9, 14, 19, 24],
    // [14, 19, 24],

    [3, 8, 13, 18],
    // [8, 13, 18],

    // [2, 7, 12],

    [11, 16, 21, 26],
    [16, 21, 26, 31],
    // [21, 26, 31],

    [17, 22, 27, 23],
    // [22, 27, 32],

    // [23, 28, 33],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return squares[a];
    }
  }
  return null;
}
