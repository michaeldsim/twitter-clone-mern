import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'


export const Home = () => {
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
            <div className='home-content'>
            <h1> Welcome to Quacker! <span role='img' aria-label='duck image'>🦆</span></h1>
            <p>
                This was a fun fullstack project that I gave to myself that is designed to be similar to Twitter and use the MERN stack in order to gain experience using web development technologies.
            </p>
            </div>
        </div>
    )
}