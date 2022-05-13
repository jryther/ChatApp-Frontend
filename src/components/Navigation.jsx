import React from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Navigation(props) {

  function Logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/"
  }

  return (
    <div className="navigation">
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/VideoCallPage">
          Video Call App
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/Account">Account</Nav.Link>
            <Button onClick={Logout} type='button' variant="danger">Logout</Button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;