import React from "react";

function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let n = 1;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === null || squares[b] === null || squares[c] === null)
      n = 0;
    else if (squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  if (n === 1) return "Draw";
  return null;
}

// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }

//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

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
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
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
          squares: Array(9).fill(null),
        },
      ],
      stepnum: 0,
      is_x_next: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepnum + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (checkWinner(squares) || squares[i]) return;
    squares[i] = this.state.is_x_next ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepnum: history.length,
      is_x_next: !this.state.is_x_next,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      is_x_next: step % 2 === 1,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepnum];
    const winner = checkWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.is_x_next ? "X" : "O");
    }

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">{status}</div>
          <div className="basniwal">
            <button
              className="back"
              onClick={() => {
                const step = this.state.stepnum;
                if (step > 0) {
                  this.setState({
                    stepnum: step - 1,
                    is_x_next:  !this.state.is_x_next,
                  });
                }
              }}
            >
              <i className="undo icon"></i>
            </button>
            <button
              className="start"
              onClick={() =>
                this.setState({
                  history: [
                    {
                      squares: Array(9).fill(null),
                    },
                  ],
                  stepnum: 0,
                  is_x_next: true,
                })
              }
            >
              Start New Game
            </button>
            <button
              className="forward"
              onClick={() => {
                const step = this.state.stepnum;
                if (history.length > step + 1) {
                  this.setState({
                    stepnum: step + 1,
                    is_x_next: !this.state.is_x_next,
                    current: history[step + 1],
                  });
                } else return;
              }}
            >
              <i className="redo icon"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
