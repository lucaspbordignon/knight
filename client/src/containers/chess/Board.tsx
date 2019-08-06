import * as React from 'react'

import { Col, Row } from 'antd'
import { Card, Skeleton } from 'antd'

import { Square } from './Square'

import './board.scss'

interface BoardProps {
  loading: boolean

  currentPosition: string
  grid: boolean
  size: number
  turns: number

  data: Array<Array<any>>
  possibleMoves: Array<string>

  getPossibleMoves(payload: object): void
}

const Board: React.FunctionComponent<BoardProps> = (props) => {
  const { loading, currentPosition, grid, size, turns, data, possibleMoves, getPossibleMoves } = props

  const onClick = (position: number): void => getPossibleMoves({ position, turns })

  const renderGridRows = () =>
    ['8', '7', '6', '5', '4', '3', '2', '1'].map((row) => (
      <Col span={24} className="grid-row">
        <strong>{row}</strong>
      </Col>
    ))

  const renderGridCols = () =>
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((col) => (
      <Col span={3} className="grid-column">
        <strong>{col}</strong>
      </Col>
    ))

  return (
    <Card className="board-container">
      <Skeleton loading={loading} active>
        <Row className="board-content">
          <Col span={2}>
            <Row className="grid-row-container">{grid && renderGridRows()}</Row>
          </Col>

          <Col span={22}>
            <Row>
              {grid && renderGridCols()}

              {data.map((boardRow) =>
                boardRow.map((square) => (
                  <Square
                    algebraicPosition={square.algebraic}
                    bitmapPosition={square.bitmap}
                    boardSize={size}
                    selectedPositions={possibleMoves}
                    currentPosition={currentPosition}
                    onClick={onClick}
                  />
                )),
              )}
            </Row>
          </Col>
        </Row>
      </Skeleton>
    </Card>
  )
}

export { Board }
