import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Popup from "./popup";
import Button from "react-bootstrap/Button";

function NavBar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    setLoginOpen(true);
    setSignupOpen(false);
    setShowModal(true);
  };

  const handleSignup = () => {
    setSignupOpen(true);
    setLoginOpen(false);
    setShowModal(true);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        {/* <Navbar.Brand href="#home">EHA RECRUITMENT PORTAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
          <Nav>
            <Nav.Link eventKey={2} href="#">
              {/* <Button variant="contained" color="primary" onClick={handleLogin}>
                LOGIN
              </Button> */}
              <Button variant="light" onClick={handleSignup}>
                SIGNUP/LOGIN
              </Button>
            </Nav.Link>
            <Popup
              showModal={showModal}
              setShowModal={setShowModal}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              loginOpen={loginOpen}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
