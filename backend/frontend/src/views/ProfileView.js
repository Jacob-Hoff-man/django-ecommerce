import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col, Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { getUserData, updateUserData  } from '../reduxState/actions/userActions'
import { USER_UPDATE_RESET } from '../reduxState/constants/userConstants'
import { getMyOrders } from '../reduxState/actions/orderActions'

// components
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProfileView() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageVariant, setMessageVariant] = useState('')

    let navigate = useNavigate()
    const dispatch = useDispatch()

    /* getting userData from redux state */
    const userDataState = useSelector(state => state.userData)
    const { error, loading, user } = userDataState

    /* getting userData from userLogin in redux state to ensure user is logged in */
    const userLoginState = useSelector(state => state.userLogin)
    const { userData } = userLoginState

    /* getting sucess from userUpdate in redux state to ensure that userUpdate is cleared appropriately */
    const userUpdateState= useSelector(state => state.userUpdate)
    const { success } = userUpdateState

    /* getting orders from redux state */
    const ordersState = useSelector(state => state.orders)
    const { loading:loadingOrders, error:errorOrders, orders } = ordersState

    useEffect(() => {
        /* redirect the user from this page if they are not logged in */
        if(!userData) {
            navigate('/login')
        } else {



            if(!user || !user.name || success) {
                /* ensuring that userUpdate state is cleared after a successful userUpdate submit */
                dispatch({ type: USER_UPDATE_RESET })
                /* no user info loaded, so dispatch to get it */
                dispatch(getUserData('profile'))
                /* get orders for current user */
                dispatch(getMyOrders())
                console.log(orders)
            } else {
                /* user info is already loaded, so pre-fill the component state */
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userData, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        setMessage('')

        if(password !== confirmPassword) {
            setMessageVariant('warning')
            setMessage('Passwords do not match.')
        } else if (password !== '' && password.length < 8){
            setMessageVariant('warning')
            setMessage('Password must be at least 8 characters long.')
        } else {
            dispatch(updateUserData({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessageVariant('success')
            setMessage('Your profile was successfully updated.')
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                    { message && <Message variant={messageVariant}>{message}</Message>}
                    { error && <Message variant='warning'>{error}</Message> }
                    { loading && <Loader /> }
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-4' controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                required
                                type='name' 
                                placeholder='Enter Name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='my-4' controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control 
                                required
                                type='email' 
                                placeholder='Enter Email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='my-4' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type='password' 
                                placeholder='Enter Password' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='my-4' controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type='password' 
                                placeholder='Enter Password Again' 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary'> Register </Button>

                    </Form>

            </Col>

            <Col md={3}>
                <h2>My Orders</h2>
                { loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='warning'>{errorOrders}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>
                        
                        <tbody >
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : ( <i className='fas fa-times' style={{ color: 'red' }}></i> )}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileView