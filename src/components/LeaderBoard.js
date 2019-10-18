import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Row, Col, Table} from 'react-bootstrap';

class LeaderBoard extends Component {
  render () {
    const { usersInfo } = this.props
    let count = 1
    return (
      <Row className="justify-content-center">
      <Col sm={10}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Position</th>
            <th>User</th>
            <th>Answered questions</th>
            <th>Created questions</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
        {usersInfo.map((user) =>(
          <tr key={user.id}>
            <td className='font-weight-bold'>{count++}</td>
            <td><img alt={`${user.name}'s avatar'`} style={{ width: '2rem' }} src={user.avatarURL} /> {user.name}</td>
            <td>{user.numAnswered}</td>
            <td>{user.numQuestions}</td>
            <td>{user.score}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      </Col>

      </Row>
    )
  }
}
function mapStateToProps({users}){
  function formatUser(id, name, avatarURL ,answered, questions) {
    return {
      id,
      name,
      avatarURL,
      numAnswered:answered,
      numQuestions:questions,
      score:answered+questions
    }
  }

  users = Object.values(users)
  const usersInfo = []
  users.map((user) =>
    usersInfo.push(
      formatUser(
        user.id,
        user.name,
        user.avatarURL,
        Object.keys(user.answers).length,
        user.questions.length
      ))
  )
  return {
    users,
    usersInfo: usersInfo.sort((a, b) => b.score - a.score)
  }
}

export default connect(mapStateToProps)(LeaderBoard)
