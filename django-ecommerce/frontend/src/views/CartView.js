import React, { useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
// react redux import for global state handling+API calls
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../reduxState/actions/cartActions'
// components
import Message from '../components/Message'

function CartView({ match, location }) {
    const { id } = useParams()
    /* get quantity parameter from url */
    const [searchParams] = useSearchParams()
    const quantity = Number(searchParams.get("quantity"))

    const navigate = useNavigate()

    /* get cart data from redux state */
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    /* getting userData from userLogin in redux state to ensure user is logged in */
    const userLoginState = useSelector(state => state.userLogin)
    const { userData } = userLoginState


    useEffect(() => {
        /* only calling dispatch when an item is added to cart (if id is present in url) */
        if(id) {
            dispatch(addToCart(id, quantity))
        }
    }, [dispatch, id, quantity])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    } 

    const checkoutHandler = () => {
        /* redirect the user from this page if they are not logged in */
        if(!userData) {
            navigate('/login')
        } else {
            /* once user is logged in, redirect to shipping view */
            navigate('/shipping')
        }
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? (
                        <Message variant='info'>
                            Your cart is empty <Link to='/'>Return</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush' >
                            {
                                cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>

                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={2}>
                                                ${item.price}
                                            </Col>

                                            <Col md={3}>
                                                <Form.Control
                                                        as="select"
                                                        value={item.quantity}
                                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) =>(
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }

                                                </Form.Control>
                                            </Col>

                                            <Col md={1}>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)} items)</h2>
                            ${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Checkout
                            </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default CartView