import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { register  } from '../reduxState/actions/userActions'

// components
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

function RegisterView() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    let navigate = useNavigate()
    const dispatch = useDispatch()

    /* getting userData from redux state */
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userData } = userRegister

    /* redirect the user if they are already logged in */
    useEffect(() => {
        if(userData) {
            navigate(-1)
        }
    }, [navigate, userData])

    const submitHandler = (e) => {
        e.preventDefault()
        setMessage('')

        if(password !== confirmPassword) {
            setMessage('Passwords do not match.')
        } else if (password.length < 8){
            setMessage('Password must be at least 8 characters long.')
        } else {
            dispatch(register(name, email, password))
        }

    }

    return (
        <FormContainer>
            <h1>Create New Account</h1>
            { message && <Message variant='warning'>{message}</Message>}
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
                        required
                        type='password' 
                        placeholder='Enter Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-4' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        required
                        type='password' 
                        placeholder='Enter Password Again' 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'> Register </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Already Registered? 
                    <Link className='px-1' to={'/login'}>Sign In</Link>
                </Col>

            </Row>

        </FormContainer>
    )
}

export default RegisterView