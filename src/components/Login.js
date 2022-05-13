import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Navbar, Nav, Container, Row, Col, Image } from 'react-bootstrap';

class login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      uid: "",
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  SignUp() {
    window.location.href = "/Signup";
  }

  handleFormSubmit = async(event) => {
    event.preventDefault();

    const endpointAuthenticate = "http://localhost:8080/authenticate";
    const endpointUserDetails = "http://localhost:8080/userdetails";
    const endpointUserImage = "http://localhost:8080/GetPresignedURL/";

    const username = this.state.username;
    const password = this.state.password;
    const  uid = this.state.uid;

    const user_object = {
      username: username,
      password: password,
      uid: uid,
    };

    await axios.post(endpointAuthenticate, user_object)
    .then(res => {
      localStorage.setItem("authorization", "Bearer " + res.data.jwt);
      this.props.history.push("/VideoCallPage");
    })
    .catch((error) => {
      if (error.response) {
        alert("Authentication failure");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return;
      }
      else if (error.request) {
        alert("System Error");
        console.log(error.request);
        return;
      }
      else {
        alert("Unknown Error");
        console.log(error.message);
        return;
      }
    });

    await axios.get(endpointUserDetails,{
      headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem("authorization")
      }})
    .then(res => {
      sessionStorage.setItem("firstname", res.data.firstname);
      sessionStorage.setItem("lastname", res.data.lastname);
      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem("uid", res.data.uid);
    })
    .catch((error) => {
      if (error.response) {
        alert("Server Error");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return;
      }
      else if (error.request) {
        alert("System Error");
        console.log(error.request);
        return;
      }
      else {
        alert("Unknown Error");
        console.log(error.message);
        return;
      }
    });

    await axios.get(endpointUserImage + sessionStorage.getItem("email"),{
      headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem("authorization")
      }})
    .then(res => {
      sessionStorage.setItem("imageURL", res.data);
    })
    .catch((error) => {
      if (error.response) {
        alert("Server Error");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return;
      }
      else if (error.request) {
        alert("System Error");
        console.log(error.request);
        return;
      }
      else {
        alert("Unknown Error");
        console.log(error.message);
        return;
      }
    });
  }

  render() {
    return (
      <div>
        <div className="navigation">
          <Navbar bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Brand href="/VideoCallPage">
              Video Call App
              </Navbar.Brand>
              <Nav className="justify-content-end">
                <Button onClick={this.SignUp} type='button' variant="primary">Signup</Button>
              </Nav>
            </Container>
          </Navbar>
        </div>
        <br></br>
        <br></br>
        <Container>
          <Row md={2} className="justify-content-md-center">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" fluid />
          </Row>
          <Row className="justify-content-md-center">
            <Col sm={6}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control value={this.state.username} onChange={ e => this.setState({ username : e.target.value }) } type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control value={this.state.password} onChange={ e => this.setState({ password : e.target.value }) } type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button onClick={this.handleFormSubmit} variant="primary" type="submit" size="lg">
                    Login
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default login;
