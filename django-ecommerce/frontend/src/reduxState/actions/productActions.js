import axios from 'axios'

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

/* handles the getProducts API call */
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const { data } = await axios.get('/api/products/')
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}

/* handles the getProduct API call for a single product */
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}