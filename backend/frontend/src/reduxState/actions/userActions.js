import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DATA_REQUEST,
    USER_DATA_SUCCESS,
    USER_DATA_FAIL,
    USER_DATA_RESET,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
} from '../constants/userConstants'

import { ORDERS_RESET } from '../constants/orderConstants'

import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        /* post request data configuration */
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        /* generate the post request data with axios */
        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data  
        })

        /* setting user data to local storage */
        localStorage.setItem('userData', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}

export const logout = (dispatch) => {
    /* remove userData from local storage */
    localStorage.removeItem('userData')
    /* immediately update global state to remove userData */
    dispatch({
        type: USER_LOGOUT
    })
    /* reset the stored userData for updating a profile whenever logging out */
    dispatch({
        type: USER_DATA_RESET
    })
    /* reset the stored orders whenever logging out */
    dispatch({
        type: ORDERS_RESET
    })

}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        /* request data configuration */
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        /* generate the post request data with axios */
        const { data } = await axios.post(
            '/api/users/register/',
            { 'name': name, 'email': email, 'password': password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data  
        })
        /* immediately log in the new user */
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data  
        })

        /* setting user data to local storage */
        localStorage.setItem('userData', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}

export const getUserData = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DATA_REQUEST,
        })
        /* getting userData from global state */
        const { userLogin: { userData } } = getState()
        
        /* request data configuration */
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }
        /* generate the post request data with axios */
        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )

        dispatch({
            type: USER_DATA_SUCCESS,
            payload: data  
        })

        /* setting user data to local storage */
        localStorage.setItem('userData', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type:USER_DATA_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}

export const updateUserData = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        })
        /* getting userData from global state */
        const { userLogin: { userData } } = getState()
        
        /* request data configuration */
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        }
        /* generate the post request data with axios */
        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data  
        })

        /* log in the user with the updated userData */
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data  
        })
        /* setting updated user data to local storage */
        localStorage.setItem('userData', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}