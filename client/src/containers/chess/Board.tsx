import * as React from 'react'

import { Col, Row } from 'antd'
import { Card, Skeleton } from 'antd'

import { Square } from './Square'

import './board.scss'

interface BoardProps {
  loading: boolean
  size: number
  turns: number
  data: Array<Array<any>>
  possibleMoves: Array<string>
  currentPosition: string

  getPossibleMoves(payload: object): void
}

const Board: React.FunctionComponent<BoardProps> = (props) => {
  const { loading, size, turns, data, possibleMoves, currentPosition, getPossibleMoves } = props

  const onClick = (position: number): void => getPossibleMoves({ position, turns })

  return (
    <Card className="board-container">
      <Skeleton loading={loading} active>
        <Row className="board-content">
          <Col span={24}>
            <Row>
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
