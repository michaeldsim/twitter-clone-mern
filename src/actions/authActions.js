import {returnErrors} from './errorActions'
import axios from 'axios'

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: 'USER_LOADING'})

    axios.get('http://localhost:5000/api/verify/user', tokenConfig(getState))
        .then(res => dispatch({
            type: 'USER_LOADED',
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
            type: 'AUTH_ERROR'
        })})
}

export const logout = () => {
    return {
      type: 'LOGOUT_SUCCESS'
    };
  };

export const tokenConfig = getState => {
    const token = getState().auth.token;
  
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    if (token) {
      config.headers['auth-token'] = token;
    }
  
    return config;
  };
  