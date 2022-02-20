import React, { useState, useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
// react redux import for global state handling+API calls
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../reduxState/actions/productActions'
// components
import Product from '../components/products/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeView() {

  const dispatch = useDispatch()
  /* get productList data from redux state */
  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList

  useEffect(() => {
      // fetch products from db using fetchProducts API call
      dispatch(listProducts())
  }, [dispatch])

  return (
    <div>
        <h1>Latest Products</h1>
        { loading ? <Loader/>
                  : error ? <Message variant='warning' children={error}/>
                          : 
                            <Row>
                                {products.map(product => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
        }
    </div>
  )
}

export default HomeView