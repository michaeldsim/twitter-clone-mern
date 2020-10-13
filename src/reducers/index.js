import authReducer from './authReducer'
import errorReducer from './errorReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    auth : authReducer,
    error : errorReducer
})

export default allReducers