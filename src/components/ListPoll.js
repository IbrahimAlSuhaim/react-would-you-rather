import React, { Component} from 'react'
import { connect } from 'react-redux'
import PollAbstract from './PollAbstract'
import { Col, ListGroup, Tabs, Tab } from 'react-bootstrap';

class ListPoll extends Component {
  render() {
    const { answeredIds, unAnsweredIds } = this.props
    return (
      <Col>
        <Tabs defaultActiveKey="unanswered">
          <Tab eventKey="unanswered" title="Unanswered Questions">
            <ListGroup variant="flush">
            {unAnsweredIds.map((id) => (
              <ListGroup.Item key={id}>
              <PollAbstract id={id} />
              </ListGroup.Item>
            ))}
            </ListGroup>
          </Tab>
          <Tab eventKey="answered" title="Answered Questions">
            <ListGroup variant="flush">
            {answeredIds.map((id) => (
              <ListGroup.Item key={id}>
              <PollAbstract id={id} />
              </ListGroup.Item>
            ))}
            </ListGroup>
          </Tab>
        </Tabs>
      </Col>
    )
  }
}

function mapStateToProps({authedUser, polls, users}){
  const pollIds = Object.keys(polls)
    .sort((a,b) => polls[b].timestamp - polls[a].timestamp)

  const answeredIds = Object.keys(users[authedUser].answers)
  const unAnsweredIds = pollIds.filter((id) => !answeredIds.includes(id))
  return {
    pollIds,
    answeredIds,
    unAnsweredIds,

  }
}
export default connect(mapStateToProps)(ListPoll)
