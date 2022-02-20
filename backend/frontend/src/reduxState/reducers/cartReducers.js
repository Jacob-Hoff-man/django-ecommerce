import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,

} from '../constants/cartConstants'

export const cartReducer = (state={cartItems:[], shippingAddress: {} }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const itemExists = state.cartItems.find(x => x.product === item.product)
            /* check if the item related to the action already exists in cartItems */
            if(itemExists) {
                /* replace the existing item with the new item (quantity adjustment) */
                /* product is referring to product id */
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === itemExists.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            /* filter through cartItems, only keep items with product id that != the action payload product id */
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            /* save the entire shipping address form */
            return{
                ...state,
                shippingAddress: action.payload
            }
        
        case CART_SAVE_PAYMENT_METHOD:
            /* save the entire payment method form */
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}