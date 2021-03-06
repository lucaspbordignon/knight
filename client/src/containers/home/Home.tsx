import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Col, Layout, Row, Tabs } from 'antd'
import { Button, Card, Checkbox, Divider, InputNumber, Modal, Slider } from 'antd'

import { ReactComponent as KnightIcon } from '../../assets/icons/logo.svg'
import { Board } from '../chess'

import { changeTurns, getBoard, getPossibleMoves, showGrid } from '../../redux/ducks/chess'

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
            Knight is an app that calculates all possible moves for a Knight in a chess board. It is possible to set the
            value of turns that must be used inside the application.
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
      <Card>
        <Row gutter={16}>
          <Col span={24}>Number of turns:</Col>

          <Col span={8}>
            <Slider min={1} max={16} value={turns} onChange={(turns) => changeTurns({ turns })} />
          </Col>

          <Col span={16}>
            <InputNumber min={1} max={1000} value={turns} onChange={(turns) => changeTurns({ turns })} />
          </Col>

          <Col span={24}>
            <Divider />
            <Checkbox checked={grid} onChange={(event) => showGrid({ grid: event.target.checked })}>
              Show chess board grid
            </Checkbox>
          </Col>
        </Row>
      </Card>
    )
  }

  render() {
    const { chess, getPossibleMoves } = this.props
    const { board, boardSize, currentPosition, grid, loading, possibleMoves, turns } = chess

    return (
      <Layout>
        <Layout.Header>
          <Row>
            <Col span={24}>
              <div className="header">
                <KnightIcon className="logo" />
                Knight
              </div>
            </Col>
          </Row>
        </Layout.Header>

        <Layout.Content className="content-container">
          <Tabs defaultActiveKey="board">
            <Tabs.TabPane tab="Chess Board" key="board">
              <Board
                loading={loading}
                currentPosition={currentPosition}
                grid={grid}
                data={board}
                size={boardSize}
                turns={turns}
                possibleMoves={possibleMoves}
                getPossibleMoves={getPossibleMoves}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Settings" key="settings">
              {this.renderSettings()}
            </Tabs.TabPane>
          </Tabs>
        </Layout.Content>

        <Layout.Footer className="footer-container">Made with ♥ by Lucas Bordignon</Layout.Footer>

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
