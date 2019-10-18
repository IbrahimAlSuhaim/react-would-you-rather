import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Card, Row , Col ,Button, Form} from 'react-bootstrap';
import { handleAddQuestion } from '../actions/polls'
import { Redirect } from 'react-router-dom'

class NewPoll extends Component {
  state ={
    optionOne: '',
    optionTwo: '',
    toHome: false
  }
  handleChangeOne = (e) => {
    const optionOne = e.target.value

    this.setState(() => ({
      optionOne
    }))
  }
  handleChangeTwo = (e) => {
    const optionTwo = e.target.value

    this.setState(() => ({
      optionTwo
    }))
  }
  handleSubmit = (e, optionOneText, optionTwoText) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    this.setState(() => ({
      optionOne:'',
      optionTwo:'',
      toHome:true
    }))
  }
  render() {
    if(this.state.toHome === true) {
      return <Redirect to='/' />
    }
    const { optionOne, optionTwo } = this.state
    return (
      <Row className="justify-content-center">
        <Card style={{ width: '45rem' }}>
          <Card.Header className='text-center' as="h3">Create New Question</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Card.Text>Compelete the questions:</Card.Text>
                <Card.Title>Would You Rather...</Card.Title>
                <Form onSubmit={(e) => this.handleSubmit(e, optionOne, optionTwo)}>
                  <Form.Group>
                    <Form.Control onChange={this.handleChangeOne} type="text" placeholder="Enter Option One Text Here" />
                    <Form.Label>OR</Form.Label>
                    <Form.Control onChange={this.handleChangeTwo} type="text" placeholder="Enter Option Two Text Here" />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={optionOne===''||optionTwo===''}>
                    Submit
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

export default connect()(NewPoll)
