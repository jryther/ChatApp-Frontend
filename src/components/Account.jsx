import React, { Component } from "react";
import { Container, Row, Col, Image, Button, Form, OverlayTrigger } from 'react-bootstrap'
import Navigation from './Navigation';
import axios from "axios";

class Account extends Component {
  constructor() {
    super();

    this.state = {
      navbar: <Navigation />,
      uid: sessionStorage.getItem("uid"),
      firstName: sessionStorage.getItem("firstname"),
      lastName: sessionStorage.getItem("lastname"),
      email: sessionStorage.getItem("email"),
      img: sessionStorage.getItem("imageURL")
    };;
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

  EditAccount() {
    window.location.href = "/EditAccount";
  }

  render() {
    return (
      <div>
        <Navigation/>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col className="justify-content-md-center" md="auto">
              <OverlayTrigger
                placement="bottom-end"
                delay={{ show: 250, hide: 2000 }}
                overlay={<Button onClick={this.UploadImage} className="btn btn-lg btn-primary btn-block" type="button">+</Button>}>
                <Image src={this.state.img} roundedCircle />
              </OverlayTrigger>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row className="justify-content-md-center">
            <Col className="justify-content-md-center" md="auto">
              <h1>{this.state.firstName} {this.state.lastName}</h1>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="justify-content-md-center" md="auto">
              {this.state.email}
            </Col>
          </Row>
          <br></br>
          <Row className="justify-content-md-center">
            <Col className="justify-content-md-center" md={3}>
            <div className="d-grid gap-2">
              <Button size="lg" onClick={this.EditAccount} className="btn btn-lg btn-primary btn-block" type="button">
                Edit
              </Button>
            </div>
            </Col>
          </Row>
        </Container>
      </div>
    )

  }
}
export default Account;