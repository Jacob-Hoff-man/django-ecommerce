import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FAIL,
    ORDERS_RESET
} from '../constants/orderConstants'

export const orderCreateReducer = (state={}, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        
        case ORDER_CREATE_SUCCESS:
            return { 
                loading: false,
                success: true,
                order: action.payload
            }  
            
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_CREATE_RESET:
            return {}

        default: 
            return state
        
    }
    
}

export const orderDetailsReducer = (state={loading: true, orderItems: [], shippingAddress: {}}, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case ORDER_DETAILS_SUCCESS:
            return { 
                loading: false,
                order: action.payload
            }  
            
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default: 
            return state
        
    }
    
}

export const ordersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDERS_REQUEST:
            return {
                loading: true
            }

        case ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDERS_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}