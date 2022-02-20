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

export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {loading:true}
        
        case USER_LOGIN_SUCCESS:
            return {loading:false, userData: action.payload}

        case USER_LOGIN_FAIL:
            return {loading:false, error: action.payload}
        
        case USER_LOGOUT:
            // reset state
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading:true}
        
        case USER_REGISTER_SUCCESS:
            return {loading:false, userData: action.payload}

        case USER_REGISTER_FAIL:
            return {loading:false, error: action.payload}
        
        case USER_LOGOUT:
            // reset state
            return {}
        default:
            return state
    }
}

export const userDataReducer = (state = { user: {} }, action) => {
    switch(action.type) {
        case USER_DATA_REQUEST:
            return { ...state, loading:true}
        
        case USER_DATA_SUCCESS:
            return {loading:false, user: action.payload}

        case USER_DATA_FAIL:
            return {loading:false, error: action.payload}
        
        case USER_DATA_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return { loading:true }
        
        case USER_UPDATE_SUCCESS:
            return {loading:false, success: true, userData: action.payload}

        case USER_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        
        case USER_UPDATE_RESET:
            return {}

        default:
            return state
    }
}