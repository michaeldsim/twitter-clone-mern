import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './styles.css'

export const PageNotFound = () => {
    return(
        <div>
            <Navbar bg="dark" variant='dark'>
                <Navbar.Brand href="/">Quacker</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <p className='home-content'>
                Page was not found!
            </p>
        </div>
    )
}