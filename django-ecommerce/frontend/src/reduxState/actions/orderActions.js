import axios from 'axios'

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FAIL
} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
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
        const { data } = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data  
        })
        
        /* clear the cart state */
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data  
        })
        /* remove the cart data from localData */
        localStorage.removeItem('cartItems')

    } catch (err) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
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
        /* generate the GET request data with axios */
        const { data } = await axios.get(
            `/api/orders/${id}`,
            config
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data  
        })

    } catch (err) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDERS_REQUEST
        })

        const {
            userLogin: { userData } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userData.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/myorders/`,
            config
        )

        dispatch({
            type: ORDERS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDERS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}