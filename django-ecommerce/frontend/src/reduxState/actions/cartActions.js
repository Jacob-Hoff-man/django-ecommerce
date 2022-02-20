import axios from 'axios'

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,

} from '../constants/cartConstants'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    /* get product data from product id */
    const {data} = await axios.get(`/api/products/${id}`)

    /* adds the specified id to the cart upon dispatch */
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity
        }
    })

    /* setting cart items to local storage using getState*/
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id) => (dispatch, getState) => {
    /* removes the specified id from the cart upon dispatch */
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    /* setting cart items to local storage using getState*/
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    /* removes the specified id from the cart upon dispatch */
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    /* setting cart items to local storage using getState*/
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    /* removes the specified id from the cart upon dispatch */
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    /* setting cart items to local storage using getState*/
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}