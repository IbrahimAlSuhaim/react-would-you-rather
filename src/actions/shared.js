import { _getUsers, _getQuestions } from '../utils/_DATA.js'
import { receiveUsers } from './users'
import { receivePolls } from './polls'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return Promise.all([
      _getUsers(), _getQuestions()
    ]).then(([users, questions]) => {
        dispatch(receiveUsers(users))
        dispatch(receivePolls(questions))
        dispatch(hideLoading())
      })
  }
}
