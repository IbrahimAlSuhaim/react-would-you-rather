import React, { Component, Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Poll from './Poll'
import ListPoll from './ListPoll'
import NewPoll from './NewPoll'
import { Container } from 'react-bootstrap'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import LeaderBoard from './LeaderBoard'
import SignIn from './SignIn'
import NotFoundPage from './NotFoundPage'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Container>
          {this.props.notSigned === true
            ? <SignIn />
            : <Fragment>
                <Nav />
                <div>
                  <Switch>
                    <Route path='/' exact component={ListPoll} />
                    <Route path='/questions/:id' component={Poll} />
                    <Route path='/add' component={NewPoll} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                    <Route path='*' component={NotFoundPage} />
                  </Switch>
                </div>
              </Fragment>
          }
          </Container>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    notSigned: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
