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
class Board extends React.Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
  }

  calculateWinner() {
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
    const list = this.state.squares

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (list[a] && list[a] === list[b] && list[a] === list[c]) {
        return list[a]
      }
    }
    return null
  }

  handleClick(i) {
    if (this.calculateWinner()) {
      return console.log('已经分出胜负')
    }

    if (this.state.squares[i]) {
      return console.log(`点击 ${i} 位置已经有棋子`)
    }

    const value = this.state.xIsNext ? 'X' : 'O'

    this.setState({
      squares: this.state.squares.map((item, index) => i === index ? value : item),
      xIsNext: !this.state.xIsNext
    })
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />
  }

  render() {
    const winner = this.calculateWinner()

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div>
        <div className="status">{status}</div>
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
    )
  }
}

/**
 * 游戏组件
 */
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
