import {
    EVENTS_REQUEST,
    EVENTS_SUCCESS,
    EVENTS_FAIL,

    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAIL,

    RAFFLE_TICKETS_REQUEST,
    RAFFLE_TICKETS_SUCCESS,
    RAFFLE_TICKETS_FAIL,

    RAFFLE_TICKET_CREATE_REQUEST,
    RAFFLE_TICKET_CREATE_SUCCESS,
    RAFFLE_TICKET_CREATE_FAIL,
    RAFFLE_TICKET_CREATE_RESET,

} from '../constants/eventsConstants'

export const eventsReducer = (state = {events: {} }, action) => {
    switch(action.type) {
        case EVENTS_REQUEST:
            return {...state, loading:true}
        
        case EVENTS_SUCCESS:
            return {...state, loading:false, events: action.payload}

        case EVENTS_FAIL:
            return {loading:false, error: action.payload}
        
        default:
            return state
    }
}

export const eventDetailsReducer = (state = {event: {} }, action) => {
    switch(action.type) {
        case EVENT_DETAILS_REQUEST:
            return {...state, loading:true}
        
        case EVENT_DETAILS_SUCCESS:
            return {...state, loading:false, event: action.payload}

        case EVENT_DETAILS_FAIL:
            return {loading:false, error: action.payload}
        
        default:
            return state
    }
}

export const raffleTicketsListReducer = (state = {raffleTickets:[]}, action) => {
    switch(action.type) {
        case RAFFLE_TICKETS_REQUEST:
            return {loading:true}
        
        case RAFFLE_TICKETS_SUCCESS:
            return {loading:false, raffleTickets: action.payload}

        case RAFFLE_TICKETS_FAIL:
            return {loading:false, error: action.payload}
        
        default:
            return state
    }
}

export const raffleTicketCreateReducer = (state={}, action) => {
    switch(action.type) {
        case RAFFLE_TICKET_CREATE_REQUEST:
            return {
                loading: true
            }
        
        case RAFFLE_TICKET_CREATE_SUCCESS:
            return { 
                loading: false,
                success: true,
                order: action.payload
            }  
            
        case RAFFLE_TICKET_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case RAFFLE_TICKET_CREATE_RESET:
            return { }

        default: 
            return state
        
    }
    
}