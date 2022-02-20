import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
// react redux import for global state handling+API calls
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../reduxState/actions/orderActions'

// components
import Message from '../components/Message'
import Loader from '../components/Loader'

function OrderView() {
    const { id } = useParams()
    /* get orderDetails from global redux state */
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const dispatch = useDispatch()

    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0).toFixed(2)

    }



    useEffect(() => {
        if(!order || order._id !== Number(id)) {
            dispatch(getOrderDetails(id))

        }
    }, [order, id])

    return loading ? (
        <Loader/>
        ) : error ? (
            <Message variant='warning'>{error}</Message>
                ) : (
                    <div>
                        <h1>Order #{order._id} has been confirmed!</h1>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p>
                                            <u>Name:</u> {order.user.name}
                                        </p>
                                        <p>
                                            <u>Email:</u> <a style={{textDecoration: 'none'}} href={`mailto:{order.user.email}`}>{order.user.email}</a>
                                        </p>
                                        <p>
                                            <u>Shipping Address:</u>{' '}
                                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                                        </p>
                                        { order.isDelivered ? (
                                            <Message variant='success'>Order delivered on {order.deliveredAt}.</Message>
                                        ) : (
                                            <Message variant='warning'>Order has not been delivered.</Message>
                                        )}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h2>Payment</h2>
                                        <p>
                                            <u>Payment Method:</u>{' '}
                                            {order.paymentMethod}
                                        </p>
                                        { order.isPaid ? (
                                            <Message variant='success'>Paid on {order.paidAt}.</Message>
                                        ) : (
                                            <Message variant='warning'>Order has not been paid for.</Message>
                                        )}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h2>Ordered Items</h2>
                                        { 
                                            order.orderItems.length === 0 ? 
                                            <Message variant='warning'>
                                                Order is empty.
                                            </Message>
                                            :
                                            <ListGroup variant='flush'>
                                                {
                                                    order.orderItems.map((item, index) => 
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
                                                <Col>${order.itemsPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping:</Col>
                                                <Col>${order.shippingPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax:</Col>
                                                <Col>${order.taxPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total Price:</Col>
                                                <Col>${order.totalPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        
                    </div>
    )
}

export default OrderView