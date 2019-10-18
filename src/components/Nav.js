import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { unSetAuthedUser } from '../actions/authedUser'

class Navv extends Component {
  handleSignOut = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(unSetAuthedUser())
  }
  render() {
    const { users, authedUser, loading } = this.props
    return (
      <Navbar className='mb-3'>
        <Nav>
          <Nav.Item>
            <Nav.Link eventKey="link-1" as={NavLink} to='/' exact>
                Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" as={NavLink} to='/add'>
                New Question
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" as={NavLink} to='/leaderboard'>
                Leader Board
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Hello {loading !== true && users[authedUser].name}, <Button variant="outline-secondary" onClick={this.handleSignOut}>Sign out</Button>
          </Navbar.Text>
        </Navbar.Collapse>
        <hr />
      </Navbar>
    )
  }
}

function mapStateToProps({authedUser , users}) {
  return {
    users,
    authedUser,
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(Navv)
