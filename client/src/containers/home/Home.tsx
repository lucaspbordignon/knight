import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Col, Layout, Row, Tabs } from 'antd'
import { Button, Checkbox, InputNumber, Modal } from 'antd'

import { changeTurns, getBoard, getPossibleMoves, showGrid } from '../../redux/ducks/chess'

import { Board } from '../chess'

import 'antd/dist/antd.css'
import './home.scss'

interface HomeState {
  welcome: boolean
}

class HomeComponent extends React.Component<any, HomeState> {
  state = { welcome: true }

  componentDidMount() {
    this.props.getBoard()
  }

  renderWelcomeFooter() {
    return (
      <Button key="submit" type="primary" onClick={() => this.setState({ welcome: false })}>
        Let's get it started
      </Button>
    )
  }

  renderWelcomeModal() {
    const { welcome } = this.state

    return (
      <div>
        <Modal
          title="Welcome to Knight!"
          visible={welcome}
          onCancel={() => this.setState({ welcome: false })}
          footer={[this.renderWelcomeFooter()]}
        >
          <p>
            Knight is an app that calculates all possible moves for a Knight in a chess board. It's possible to set the
            value of turns that must be used to the calculus inside the application.
          </p>

          <p>
            For developers, the code of the application is open source and can be found at
            <a href="https://github.com/lucaspbordignon/knight" target="_blank" rel="noopener noreferrer">
              {' '}
              GitHub{' '}
            </a>
          </p>
        </Modal>
      </div>
    )
  }

  renderSettings() {
    const { changeTurns, chess, showGrid } = this.props
    const { grid, turns } = chess

    return (
      <Row>
        <Col span={24}>
          Number of turns:
          <InputNumber min={1} max={300} defaultValue={turns} onChange={(turns) => changeTurns({ turns })} />
        </Col>

        <Col span={24}>
          <Checkbox checked={grid} onChange={(event) => showGrid({ grid: event.target.checked })}>
            Show chess board grid
          </Checkbox>
        </Col>
      </Row>
    )
  }

  render() {
    const { chess, getPossibleMoves } = this.props
    const { board, boardSize, currentPosition, loading, possibleMoves, turns } = chess

    return (
      <Layout>
        <Layout.Header>
          <Row>
            <Col span={24}>
              <div>Icone legal</div>
            </Col>
          </Row>
        </Layout.Header>

        <Layout.Content className="content-container">
          <Tabs defaultActiveKey="board">
            <Tabs.TabPane tab="Chess Board" key="board">
              <Board
                loading={loading}
                size={boardSize}
                turns={turns}
                data={board}
                possibleMoves={possibleMoves}
                currentPosition={currentPosition}
                getPossibleMoves={getPossibleMoves}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Settings" key="settings">
              {this.renderSettings()}
            </Tabs.TabPane>
          </Tabs>
        </Layout.Content>

        <Layout.Footer style={{ textAlign: 'center' }}>Made with love by Lucas P. Bordignon</Layout.Footer>

        {this.renderWelcomeModal()}
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  chess: state.chess,
})

const mapDispatchToProps = (dispatch) => ({
  changeTurns: bindActionCreators(changeTurns, dispatch),
  getBoard: bindActionCreators(getBoard, dispatch),
  getPossibleMoves: bindActionCreators(getPossibleMoves, dispatch),
  showGrid: bindActionCreators(showGrid, dispatch),
})

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent)
