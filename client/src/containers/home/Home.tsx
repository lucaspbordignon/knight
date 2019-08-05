import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button, Icon, Layout, Menu, Modal } from 'antd'

import { getBoard, getPossibleMoves } from '../../redux/ducks/chess'

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
              GitHub
            </a>
          </p>
        </Modal>
      </div>
    )
  }

  render() {
    const { chess, getPossibleMoves } = this.props
    const { board, boardSize, loading, possibleMoves, currentPosition } = chess

    return (
      <Layout>
        <Layout.Header>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="logo" className="logo-btn" disabled>
              Knight
            </Menu.Item>

            <Menu.Item key="settings" className="settings-btn">
              <Icon type="setting" />
            </Menu.Item>
          </Menu>
        </Layout.Header>

        <Layout.Content className="content-container">
          <Board
            loading={loading}
            size={boardSize}
            turns={1}
            data={board}
            possibleMoves={possibleMoves}
            currentPosition={currentPosition}
            getPossibleMoves={getPossibleMoves}
          />
        </Layout.Content>

        {this.renderWelcomeModal()}
      </Layout>
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
