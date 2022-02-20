import React, { useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
// react redux import for global state handling+API calls
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../reduxState/actions/productActions'
// components
import Rating from '../components/products/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductView({ match }) {
    const {id} = useParams()
    let navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    /* get productDetails data from redux state */
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {

        dispatch(listProductDetails(id))
    }, [dispatch, match])

    const addToCart = () => {
        navigate(`/cart/${id}?quantity=${quantity}`)
    }
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Return</Link>
            {
                loading ? <Loader />
                        : error ? <Message variant='warning' children={error} /> 
                                : (
                                    <Row>
                                        <Col md={6} >
                                            <Image src={product.image} alt={product.name} fluid /> 
                                        </Col>    

                                        <Col md={3}>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <h3>{product.name}</h3>
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    <Rating value={product.rating} text={`${product.numReviews}`} color={'#f8e825'} />
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    Price: ${product.price}
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    Description: {product.description}
                                                </ListGroup.Item> 
                                            </ListGroup>
                                        </Col>

                                        <Col md={3}>
                                            <Card>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Price:</Col>
                                                            <Col>
                                                                <strong>${product.price}</strong>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Status:</Col>
                                                            <Col>
                                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>

                                                    {
                                                        product.countInStock > 0 && (
                                                            <ListGroup.Item>
                                                                <Row>
                                                                    <Col>Quantity</Col>
                                                                    <Col xs='auto' className='my-1'>
                                                                        <Form.Control
                                                                            as="select"
                                                                            value={quantity}
                                                                            onChange={(e) => setQuantity(e.target.value)}
                                                                        >
                                                                            {
                                                                                [...Array(product.countInStock).keys()].map((x) =>(
                                                                                    <option key={x + 1} value={x + 1}>
                                                                                        {x + 1}
                                                                                    </option>
                                                                                ))
                                                                            }

                                                                        </Form.Control>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        )
                                                    }

                                                    <ListGroup.Item>
                                                        <Button className="btn-block" 
                                                                onClick={addToCart}
                                                                disabled={product.countInStock === 0} 
                                                                type="button">
                                                                    Add to Cart
                                                        </Button>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                        </Col>

                                    </Row>
                                )

            }
                
        </div>
    )
}

export default ProductView