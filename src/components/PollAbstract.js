import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Card, Row , Col ,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom'

class PollAbstract extends Component {
  render() {
    const { users, poll} = this.props




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
               <Card.Text>...{poll.optionOne.text}...</Card.Text>
               <Button as={Link} to={`/questions/${poll.id}`} variant="outline-success">view poll</Button>
             </Col>
           </Row>
         </Card.Body>
       </Card>
     </Row>
   )
  }
}
function mapStateToProps({ users, polls}, {id}) {
  const poll = polls[id]
  return {
    users,
    poll,
  }
}
export default connect(mapStateToProps)(PollAbstract)
