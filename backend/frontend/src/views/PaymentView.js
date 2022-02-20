import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Col} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../reduxState/actions/cartActions'

// components
import FormContainer from '../components/FormContainer'
import CheckoutProgress from '../components/CheckoutProgress'

function PaymentView() {
    let navigate = useNavigate()
    /* geting shippingAddress in cart from Redux State to ensure it has been submitted */
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [paymentMethod, setPaymentMethod] = useState('Credit Card')

    const dispatch = useDispatch()

    if(!shippingAddress.address) {
        /* redirect the user to shipping if shippingAddress has not been submitted */
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutProgress step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Credit Card'
                            id='creditCard'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Next
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentView