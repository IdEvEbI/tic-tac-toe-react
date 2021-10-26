import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/**
 * 方块按钮组件
 */
function Square(props) {
  return (
    <button className='square' onClick={() => props.onClick()}>
      {props.value}
    </button>
  )
}

/**
 * 棋盘组件
 */
function Board(props) {
  function renderSquare(i) {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

/**
 * 游戏组件
 */
class Game extends React.Component {
  state = {
    history: [{
      squares: Array(9).fill(null),
    }],
    xIsNext: true,
    stepNumber: 0
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (this.calculateWinner(squares)) {
      return console.log('已经分出胜负')
    }

    if (squares[i]) {
      return console.log(`点击 ${i} 位置已经有棋子`)
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = this.calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start'

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
