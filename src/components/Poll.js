import React, { Component} from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/polls'
import { Card, Button,Row , Col, Form, ProgressBar, Badge, Alert } from 'react-bootstrap';
import NotFoundPage from './NotFoundPage'

class Poll extends Component {
  state = {
    option: ''
  }
  handleSubmit = (e, pid, answer) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleSaveAnswer(
      pid,
      answer
    ))
  }
  handleChange = (e) => {
    const option = e.target.value
    this.setState(() => ({
      option
    }))
  }
  toPercentage = (option, total) => {
    return Math.floor(option/total*100)
  }
  render() {
    const { users, poll, hasVoted, authedUser } = this.props

    if(!poll) {
     return <NotFoundPage />
   }


    if(hasVoted) { // if the authedUser already voted to the poll
      const total = poll.optionOne.votes.length+poll.optionTwo.votes.length
      const optionOnePercentage = Math.round((poll.optionOne.votes.length/total)*100)
      const optionTwoPercentage = Math.round((poll.optionTwo.votes.length/total)*100)
      const choosed = poll.optionOne.votes.filter((vote) => vote.includes(authedUser)).length !== 0 ? 1 : 2
      return (
        <Row className="justify-content-center">
          <Card style={{ width: '32rem' }}>
            <Card.Header as="h5">Asked by {users[poll.author].name}</Card.Header>
            <Card.Body>
              <Row>
                <Col sm md="auto">
                  <Card.Img style={{ width: '8rem' }} src={users[poll.author].avatarURL} />
                </Col>
                <Col>
                  <Card.Title>Results:</Card.Title>
                  <Alert variant={choosed===1 ? 'success':'light'} className='mb-2'>
                    <p className ='font-weight-bold'>Would you rather {poll.optionOne.text}?</p>
                    <ProgressBar now={optionOnePercentage} label={`${optionOnePercentage}%`}/>
                    <small>{poll.optionOne.votes.length} out of {total}</small>
                    {choosed===1&& <p><Badge variant="warning">Your Vote</Badge></p>}
                  </Alert>
                  <Alert variant={choosed===2 ? 'success':'light'}>
                    <p className ='font-weight-bold'>Would you rather {poll.optionTwo.text}?</p>
                    <ProgressBar now={optionTwoPercentage} label={`${optionTwoPercentage}%`}/>
                    <small>{poll.optionOne.votes.length} out of {total}</small>
                    {choosed===2&& <p><Badge variant="warning">Your Vote</Badge></p>}
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      )
    }// if authedUser doesn't vote to the poll yet
    return (
      <Row className="justify-content-center">
        <Card style={{ width: '32rem' }}>
          <Card.Header as="h5">{users[poll.author].name} asks:</Card.Header>
          <Card.Body>
            <Row>
              <Col sm md="auto">
                <Card.Img style={{ width: '8rem' }} src={users[poll.author].avatarURL} />
              </Col>
              <Col>
                <Card.Title>Would You Rather...</Card.Title>
                <Form onSubmit={(e) => this.handleSubmit(e, poll.id, this.state.option)}>
                  <Form.Check
                    custom
                    type='radio'
                    label={poll.optionOne.text}
                    name='choice'
                    id={`${poll.id}optionOne`}
                    value='optionOne'
                    onChange={(e) => this.handleChange(e)}
                  />
                  <Form.Check
                    custom
                    type='radio'
                    label={poll.optionTwo.text}
                    name='choice'
                    id={`${poll.id}optionTwo`}
                    value='optionTwo'
                    onChange={(e) => this.handleChange(e)}
                  />
                  <br />
                  <Button type="submit" variant="primary" disabled={this.state.option === ''}>Submit</Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    )
  }
}

function mapStateToProps({authedUser, users, polls}, {match}) {
  const { id } = match.params
  const poll = polls[id]
  return {
    authedUser,
    users,
    poll,
    hasVoted: poll ? poll.optionOne.votes.filter((vote) => vote.includes(authedUser)).length !== 0
            || poll.optionTwo.votes.filter((vote) => vote.includes(authedUser)).length !== 0 :null,
  }
}
export default connect(mapStateToProps)(Poll)
