import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Card, Row , Col ,Button, Form} from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {
  state = {
    choice: '',
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(this.state.choice))
    this.setState(() => ({
      choice:''
    }))
  }
  handleChange = (e) => {
    const choice = e.target.value
    this.setState(() => ({
      choice
    }))
  }
  render() {
    const { users } = this.props
    return (
      <Row className="justify-content-center text-center">
        <Card style={{ width: '45rem' }} className='mt-5'>
          <Card.Header as="h3">Welcome to the Would You Rather App!</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>Sign In</Card.Title>
                <Card.Text>Please sign in to continue</Card.Text>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Control as="select" onChange={this.handleChange}>
                      <option value=''>Choose user...</option>
                      {users!==null&&
                        users.map((user) => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))
                      }
                    </Form.Control>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled= {this.state.choice === ''}>
                    Sign In
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    )
  }
}
function mapStateToProps({users}) {
  return {
    users: (Object.keys(users).length !== 0 ) ? Object.values(users) : null
  }
}
export default connect(mapStateToProps)(SignIn)
