import React, { useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, Table } from 'react-bootstrap'
// react redux import for global state handling+API calls
import { useDispatch, useSelector } from 'react-redux'
import { listEventDetails, listRaffleTickets, createRaffleTicket } from '../reduxState/actions/eventActions'
// components
import Loader from '../components/Loader'
import Message from '../components/Message'

function EventView() {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const eventDetailsState = useSelector(state => state.eventDetails)
    const { loading, event, error } = eventDetailsState
    
    const raffleTicketsState = useSelector(state => state.raffleTickets)
    const { loading: raffleTicketsLoading , raffleTickets, error: raffleTicketsError } = raffleTicketsState

    const raffleTicketCreateState = useSelector(state => state.raffleTicketCreate)
    const { error: raffleTicketCreateError } = raffleTicketCreateState

    useEffect(() => {
        dispatch(listEventDetails(id))
        dispatch(listRaffleTickets(id))
    }, [dispatch, id])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submitted raffle ticket')
        setMessage('')

        dispatch(createRaffleTicket({
            'event': event,
            'name': name,
            'email': email
            
        }))
        setMessage('Your raffle ticket was successfully entered.')

    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Return</Link>
            {
                loading ? <Loader />
                        : error ? <Message variant='warning' children={error} /> 
                                : (
                                    <Row>
                                        <Col sm={8}>
                                            <Row className='pb-5'>
                                                <Image src={event.image} alt={event.eventName} fluid /> 
                                            </Row>

                                            <Row>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item style={{textAlign: 'center'}}>
                                                        <h3>{event.eventName}</h3>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item>
                                                        Category: {event.category}
                                                    </ListGroup.Item>

                                                    <ListGroup.Item>
                                                        Description: {event.description}
                                                    </ListGroup.Item> 
                                                </ListGroup>
                                            </Row>

                                        </Col>    
                                        <Col sm={1}/>
                                        <Col sm={3}>
                                            <Row>
                                                <Card>
                                                    <Card.Title className='mt-5' style={{textAlign: 'center'}}>Enter Raffle For a Chance to Win!</Card.Title>
                                                    <Card.Body>
                                                        { raffleTicketCreateError ? (<Message variant='warning'>{raffleTicketCreateError}</Message>) :
                                                            (message && <Message variant='success'>{message}</Message>)
                                                        }
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

                                                            <Button type='submit' variant='primary'>Submit</Button>

                                                        </Form>
                                                    </Card.Body>
                                                </Card>
                                            </Row>
                                            <Row className= 'pt-4'>
                                                <Col>
                                                    <h2 style={{textAlign: 'center'}}>Raffle Entries</h2>
                                                    { raffleTicketsLoading ? (
                                                        <Loader />
                                                    ) : raffleTicketsError ? (
                                                        <Message variant='warning'>{raffleTicketsError}</Message>
                                                    ) : (
                                                        
                                                        <Table  striped responsive className='table-sm'>
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Email</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody >
                                                                    {raffleTickets.map(ticket => (
                                                                        <tr key={ticket._id}>
                                                                            <td>{ticket.name}</td>
                                                                            <td>{ticket.email}</td>
                                                                        </tr>
                                                                    ))}
                                                            </tbody>
                                                        </Table>
                                                     
                                                    )}
                                                </Col>

                                            </Row>
                                        </Col>

                                    </Row>
                                )

            }
                
        </div>
    )
}

export default EventView