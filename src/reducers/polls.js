import { RECEIVE_POLLS, SAVE_ANSWER, ADD_QUESTION } from '../actions/polls'

export default function polls(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls
      }
    case SAVE_ANSWER:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.option]: {
            ...state[action.id][action.option],
            votes:state[action.id][action.option].votes.concat([action.authedUser])
          }
        }
      }
    case ADD_QUESTION:
      const { question } = action
      console.log(question);
      return {
        ...state,
        [question.id]: question

      }
    default:
      return state
  }
}
