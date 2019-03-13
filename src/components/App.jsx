import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import { handleInitData } from '../actions/shared';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import LoadingBar from 'react-redux-loading-bar';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitData())
  }

  render() {
    const { loading } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Nav />
            {loading
            ? null
            : <div>
                <Route path="/" exact component={Home} />
                <Route path="/new" />
              </div>
            }
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({authedUser}) => ({
  loading: authedUser === null
})

export default connect(mapStateToProps)(App)