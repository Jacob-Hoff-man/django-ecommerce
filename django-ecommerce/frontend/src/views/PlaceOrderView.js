import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
// react redux import for global state handling+API calls
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../reduxState/actions/orderActions'
import { ORDER_CREATE_RESET } from '../reduxState/constants/orderConstants'

// components
import Message from '../components/Message'
import CheckoutProgress from '../components/CheckoutProgress'

function PlaceOrderView() {
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()
    const navigate = useNavigate()
    /* get cart from redux global state */
    const cart = useSelector(state => state.cart)
    /* temporary cart values, only stored in this view */
    /* TODO: make constants for shiping cost, tax rate */
    cart.itemsPrice = cart.cartItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0).toFixed(2)
    /* itemsPrice over $100 is free shipping, 10 under */
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    /* using 6% sales tax */
    cart.taxPrice = (cart.itemsPrice * 0.06).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)



    useEffect(() => {

        /* redirect to the payment selection view if payment method is not selected */
        if(!cart.paymentMethod) {
            navigate('/payment')
        }

        if(success) {
            navigate(`/order/${order._id}`)
            /* remove order from state */
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, navigate])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }
    return (
        <div>
            <CheckoutProgress step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <u>Shipping Address:</u>{' '}
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.zipCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <u>Payment Method:</u>{' '}
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Shopping Cart</h2>
                            { 
                                cart.cartItems.length === 0 ? 
                                <Message variant='warning'>
                                    Your cart is empty.
                                </Message>
                                :
                                <ListGroup variant='flush'>
                                    {
                                        cart.cartItems.map((item, index) => 
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.quantity} x ${item.price}  
                                                    </Col>
                                                    <Col>
                                                         ${(item.quantity * item.price).toFixed(2)}               
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                </ListGroup>
                                
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                { error && <Message variant='warning'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type='button' 
                                        className='btn-block'
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrder}
                                >Place Order</Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            
        </div>
    )
}

export default PlaceOrderView