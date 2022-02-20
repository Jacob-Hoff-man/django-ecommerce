import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, NavigationType } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reduxState/actions/userActions'

// components
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

function LoginView() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate()
    const dispatch = useDispatch()

    /* getting userData from redux state */
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userData } = userLogin

    /* redirect the user if they are already logged in */
    useEffect(() => {
        if(userData) {
            navigate(-1)
        }
    }, [navigate, userData])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Log In</h1>
            { error && <Message variant='warning'>{error}</Message> }
            { loading && <Loader /> }
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-4' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
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

                <Button type='submit' variant='primary'> Log In </Button>
            </Form> 

            <Row className='py-3'>
                <Col>
                    New Customer? 
                    <Link className='px-1' to={'/register'}>Register</Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default LoginView