import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Footer() {
  return (
    <div className="footer">
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Container fluid className="justify-content-center">
          <Navbar.Brand  href="joshryther.com">joshryther.com</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;