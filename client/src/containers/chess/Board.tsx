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

  getPossibleMoves(payload: object): void
}

const Board: React.FunctionComponent<BoardProps> = (props) => {
  const { loading, size, turns, data, possibleMoves, getPossibleMoves } = props

  const onClick = (position: number): void => getPossibleMoves({ position, turns })

  return (
    <Card style={{ width: '100%', marginTop: 64 }}>
      <Skeleton loading={loading} active>
        <Row className="board-container">
          <Col span={24}>
            <Row>
              {data.map((boardRow) =>
                boardRow.map((square) => (
                  <Square
                    algebraicPosition={square.algebraic}
                    bitmapPosition={square.bitmap}
                    boardSize={size}
                    selectedPositions={possibleMoves}
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
