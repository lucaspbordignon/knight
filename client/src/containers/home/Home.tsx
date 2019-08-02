import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Col, Row } from 'antd'

import { getBoard, getPossibleMoves } from '../../redux/ducks/chess'

import { Square } from '../../components/Square'

import 'antd/dist/antd.css'
import './home.scss'

class HomeComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.getBoard()
  }

  renderBoardGrid() {
    const { chess, getPossibleMoves } = this.props
    const { board, boardSize, possibleMoves } = chess

    return (
      <Row gutter={16}>
        {board.map((boardRow) =>
          boardRow.map((square) => (
            <Square
              algebraicPosition={square.algebraic}
              bitmapPosition={square.bitmap}
              boardSize={boardSize}
              selectedPositions={possibleMoves}
              onClick={(position) => getPossibleMoves({ position, turns: 1 })}
            />
          )),
        )}
      </Row>
    )
  }

  render() {
    const { loading } = this.props.chess

    return loading ? (
      <span>Loading...</span>
    ) : (
      <div className="main-container">
        <Row gutter={16} justify="center" align="middle">
          <Col span={24} className="main-title">
            <h2>Knight</h2>
          </Col>
        </Row>

        <Row gutter={16} className="board-container">
          <Col span={24}>{this.renderBoardGrid()}</Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  chess: state.chess,
})

const mapDispatchToProps = (dispatch) => ({
  getBoard: bindActionCreators(getBoard, dispatch),
  getPossibleMoves: bindActionCreators(getPossibleMoves, dispatch),
})

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent)
