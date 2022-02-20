import axios from 'axios'

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

/* handles the getEvents API call for a specific event */
export const listEvents = () => async (dispatch) => {
    try {
        dispatch({type: EVENTS_REQUEST})
        const { data } = await axios.get(`/api/events/`)
        dispatch({
            type: EVENTS_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
            type: EVENTS_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}

/* handles the getEvent API call for a specific event */
export const listEventDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: EVENT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/events/${id}`)
        dispatch({
            type: EVENT_DETAILS_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
            type: EVENT_DETAILS_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}

/* handles the getRaffleTickets API call for a specific event */
export const listRaffleTickets = (id) => async (dispatch) => {
    try {
        dispatch({type: RAFFLE_TICKETS_REQUEST})
        const { data } = await axios.get(`/api/events/tickets/${id}`)
        dispatch({
            type: RAFFLE_TICKETS_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
            type: RAFFLE_TICKETS_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}

/* handles the addRaffleTicket API */
export const createRaffleTicket = (raffleTicket) => async (dispatch) => {
    try {
        dispatch({
            type: RAFFLE_TICKET_CREATE_REQUEST,
        })
        
        /* request data configuration */
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        /* generate the post request data with axios */
        const { data } = await axios.post(
            `/api/events/tickets/add/`,
            raffleTicket,
            config
        )

        dispatch({
            type: RAFFLE_TICKET_CREATE_SUCCESS,
            payload: data  
        })

    } catch (err) {
        dispatch({
            type:RAFFLE_TICKET_CREATE_FAIL,
            payload: err.response && err.response.data.detail ? err.response.data.detail : err.message
        })
    }
}