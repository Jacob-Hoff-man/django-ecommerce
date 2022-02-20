import React, { useEffect } from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { logout }from '../reduxState/actions/userActions'
import { listEvents } from '../reduxState/actions/eventActions'

// components
import Loader from '../components/Loader'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin


  const dispatch = useDispatch()
  /* TODO: use events to build a dynamic nav drop down (using array.map) based on listEvents() array */
  /* having issues with making this work, hard-coded some events in nav drop-down for now */
  // const eventsState = useSelector(state => state.events)
  // const { loading, events, error } = eventsState

  useEffect(() => {
    // dispatch(listEvents())
  }, [])

  const logoutHandler = () => {
    dispatch(logout)
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Django Ecommerce</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <NavDropdown title='Events' id='events'>
                <LinkContainer to={`event/1`}>
                  <NavDropdown.Item>Eyes on Dry Eye</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`event/2`}>
                  <NavDropdown.Item>Eyes on Glaucoma</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <LinkContainer to='/cart'>
                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>

              { userData ? (
                  <NavDropdown title={userData.name} id='username'>
                    <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
              ) : (
                    <LinkContainer to='/login'>
                      <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                    </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header