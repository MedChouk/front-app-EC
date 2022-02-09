import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../actions";



export default function Header(props) {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
      };

    const renderLoggedInLinks = () => {
      return (
        <Nav>
          <li className="nav-item">
            <span className="btn btn-outline-danger m-1 nav-link" onClick={logout}>
              Signout
            </span>
          </li>
        </Nav>
      );
    };
  
    const renderNonLoggedInLinks = () => {
      return (
        <Nav>
          {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
          <li className="nav-item">
            <NavLink to="signin" className="btn btn-outline-success m-1 nav-link">
              Signin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="signup" className="btn btn-outline-info m-1 nav-link">
              Signup
            </NavLink>
          </li>
        </Nav>
      );
    };

    return (
        <>
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
                <Container fluid>
                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

                </Nav>
                {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}

                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
