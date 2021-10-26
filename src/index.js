import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/**
 * 方块按钮组件
 */
class Square extends React.Component {
  state = {
    // 记录当前按钮被点击
    value: '',
  }

  render() {
    return (
      <button className='square' onClick={() => this.setState({ value: 'X' })}>
        {this.state.value}
      </button>
    )
  }
}

/**
 * 棋盘组件
 */
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />
  }

  render() {
    const status = 'Next player: X'

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
