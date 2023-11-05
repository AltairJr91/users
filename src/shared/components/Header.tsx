import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar  className=" container-md bg-body-tertiary">
            <Container>
                <Navbar.Brand>Usuarios</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-end'>
                    <Nav className='me'>
                        <NavLink className="text-decoration-none me-4 text-black icon-link icon-link-hover" to="/">Pagina inicial</NavLink>
                        <NavLink className="text-decoration-none ms-4 text-black icon-link icon-link-hover"  to="/userList">Lista de usuarios</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;