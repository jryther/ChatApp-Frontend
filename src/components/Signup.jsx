import React, { Component } from "react";
import axios from "axios";
import { Form, Row, Col, Button, Navbar, Nav, Container } from "react-bootstrap";

class signup extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      uid: -1
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = async(event) => {
    event.preventDefault();

    const endpointCreateUser = "http://localhost:8080/authenticate/createuser";

    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const password = this.state.password;

    const user_object = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    await axios.post(endpointCreateUser, user_object)
    .then(res => {
        if(res.data !== "success"){
            alert("Unable to create user");
        }
        else{
            this.props.history.push("/");
        }
    })
    .catch((error) => {
      if (error.response) {
        alert("Authentication failure");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      else if (error.request) {
        alert("System Error");
        console.log(error.request);
      }
      else {
        alert("Unknown Error");
        console.log(error.message);
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
            </Container>
          </Navbar>
        </div>
        <Form onSubmit={this.handleFormSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                placeholder="Enter first name"
                value= {this.state.firstName}
                onChange={ e => this.setState({ firstName : e.target.value }) }
                 />
                </Form.Group>

                <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Enter last name"
                value= {this.state.lastName}
                onChange={ e => this.setState({ lastName : e.target.value }) }
                 />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="Enter email address"
                value= {this.state.email}
                onChange={ e => this.setState({ email : e.target.value }) }
                 />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter password"
                value= {this.state.password}
                onChange={ e => this.setState({ password : e.target.value }) }
                 />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      </div>
    );
  }
}
export default signup;