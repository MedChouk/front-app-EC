import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';


export default function Header(props) {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

                </Nav>
                <Nav> 
                <li className="nav-item">
                    <NavLink to="signin" className="btn btn-outline-success m-1 nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="signup" className="btn btn-outline-info m-1 nav-link">Signup</NavLink>
                </li>
                    
                </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
