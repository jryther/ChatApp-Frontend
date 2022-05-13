import React, { Component } from "react";
import axios from "axios";
import { Form, Row, Col, Button, Container } from "react-bootstrap"
import Navigation from './Navigation';

class editaccount extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      uid: ""
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async UploadImage(event){
    const endpointGetPostURL = "http://localhost:8080/PostPresignedURL/" + sessionStorage.getItem("email");
    let endpointPresignedPost = null;
    const options = { headers: { 'Content-Type': 'image/jpeg', authorization: localStorage.getItem("authorization")}};
    let file = event.target.files[0];
    console.log("Test");
    console.log(file.type);
    console.log(file.name);

    await axios.get(endpointGetPostURL, options)
      .then(res => {
        endpointPresignedPost = res.data;
        console.log(endpointPresignedPost);
      })
      .catch((error) => {
        if (error.response) {
          alert("Server Error");
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

      await axios.put(endpointPresignedPost, file, { headers: { 'Content-Type': 'image/jpeg'}})
      .catch((error) => {
        console.log(error.toJSON);
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


  handleFormSubmit = async(event) => {
    event.preventDefault();

    const endpointUpdateUser = "http://backend:8080/updateuser";

    const uid = sessionStorage.getItem("uid");
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const password = this.state.password;

    const user_object = {
      uid: uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    console.log(user_object);

    if(user_object.firstName === "") {
      user_object.firstName = sessionStorage.getItem("firstname");
    }
    if(user_object.lastName === "") {
      user_object.lastName = sessionStorage.getItem("lastname");
    }
    if(user_object.email === "") {
      user_object.email = sessionStorage.getItem("email");
    }
    if(user_object.password === "") {
      user_object.password = null;
    }
    console.log(user_object.firstName);

    axios.post(endpointUpdateUser, user_object, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: localStorage.getItem("authorization")
        }})
    .then(res => {
        if(res.data !== "success"){
            alert("Unable to update user");
        }
        else{
            sessionStorage.setItem("firstname", user_object.firstName);
            sessionStorage.setItem("lastname", user_object.lastName);
            sessionStorage.setItem("email", user_object.email);
            this.props.history.push("/Account");
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
        <Navigation/>
        <Container>
          <br></br>
          <h1>Edit Account</h1>
          <br></br>
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

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control placeholder="Enter email address"
                      value= {this.state.email}
                      onChange={ e => this.setState({ email : e.target.value }) }
                      />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value= {this.state.password}
                      onChange={ e => this.setState({ password : e.target.value }) }
                      />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Profile Image</Form.Label>
                  <Form.Control type="file" onChange={this.UploadImage}/>
                </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
export default editaccount;