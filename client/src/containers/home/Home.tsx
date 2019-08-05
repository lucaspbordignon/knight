import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Icon, Layout, Menu } from 'antd'

import { getBoard, getPossibleMoves } from '../../redux/ducks/chess'

import { Board } from '../chess'

import 'antd/dist/antd.css'
import './home.scss'

class HomeComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.getBoard()
  }

  render() {
    const { chess, getPossibleMoves } = this.props
    const { board, boardSize, loading, possibleMoves } = chess

    return (
      <Layout>
        <Layout.Header>
          <div className="logo">Welcome to Knight</div>

          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="settings">
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
            getPossibleMoves={getPossibleMoves}
          />
        </Layout.Content>
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
