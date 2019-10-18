import {_saveQuestionAnswer, _saveQuestion} from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receivePolls (polls) {
  return {
    type: RECEIVE_POLLS,
    polls
  }
}

function saveAnswer(authedUser, pid, option) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    id:pid,
    option,
  }
}

export function handleSaveAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    console.log('FLAG',{authedUser, qid, answer});
    return _saveQuestionAnswer({authedUser, qid, answer})
      .then(() => dispatch(saveAnswer(authedUser, qid, answer)))
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const author = getState().authedUser
    dispatch(showLoading())
    return _saveQuestion({ optionOneText, optionTwoText, author })
      .then((formattedQuestion) => dispatch(addQuestion(formattedQuestion)))
      .then(() => dispatch(hideLoading()))
  }
}
