import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'

/* redux reducers */
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDataReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, ordersReducer} from './reducers/orderReducers'
import { eventsReducer, eventDetailsReducer, raffleTicketsListReducer, raffleTicketCreateReducer } from './reducers/eventsReducers'
/* reducer receives actions, manipulates the state, then passes state down to components */
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userData: userDataReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orders: ordersReducer,

    events: eventsReducer,
    eventDetails: eventDetailsReducer,
    raffleTickets: raffleTicketsListReducer,
    raffleTicketCreate: raffleTicketCreateReducer

})

/* if cart items exist in local storage, get and set to global state */
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems'))
                                                                : []
/* if userData exists in local storage, get and set to global state */
const userDataFromStorage = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData'))
                                                                : null
/* if shippingAddressData exists in local storage, get and set to global state */
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress'))
                                                                            : {}
/* set the initial state values */
const initialState = { 
    cart: { cartItems: cartItemsFromStorage,
            shippingAddress: shippingAddressFromStorage 
        },
    userLogin: { userData: userDataFromStorage }
}
/* using thunk middleware to look at every action and calls instances that are functions */
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
