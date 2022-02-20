import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../reduxState/actions/cartActions'


// components
import FormContainer from '../components/FormContainer'
import CheckoutProgress from '../components/CheckoutProgress'

function ShippingView() {
    let navigate = useNavigate()

    /* geting shippingAddress in cart from Redux State */
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    /* preloading state with shippingAddress values, if any */
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
    const [country, setCountry] = useState(shippingAddress.country)



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, zipCode, country }))
        /* redirect user to payment view */
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutProgress step1 step2 />
            <h1>Shipping Information</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-4' controlId='address'>
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Enter Address' 
                        value={address ? address : ''} 
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-4' controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Enter City' 
                        value={city ? city : ''} 
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-4' controlId='zipCode'>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Enter Zip Code' 
                        value={zipCode ? zipCode : ''} 
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-4' controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Enter Country' 
                        value={country ? country : ''} 
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>Next</Button>
            </Form>
        </FormContainer>

    )
}

export default ShippingView