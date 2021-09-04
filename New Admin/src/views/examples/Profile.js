/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import config from "../../configure";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const Notify = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  <Modal
    className="modal-dialog-centered modal-danger"
    contentClassName="bg-gradient-danger"
    isOpen={true}
    toggle={true}
  >
    <div className="modal-header">
      <h6 className="modal-title" id="modal-title-notification">
        Updated Successfully!
      </h6>
      <button
        aria-label="Close"
        className="close"
        data-dismiss="modal"
        type="button"
        onClick={true}
      >
        <span aria-hidden={true}>×</span>
      </button>
    </div>
    <div className="modal-body">
      <div className="py-3 text-center">
        <i className="ni ni-bell-55 ni-3x" />
        <h4 className="heading mt-4">You should read this!</h4>
        <p>
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia.
        </p>
      </div>
    </div>
    <div className="modal-footer">
      <Button className="btn-white" color="default" type="button">
        Ok, Got it
      </Button>
      <Button
        className="text-white ml-auto"
        color="link"
        data-dismiss="modal"
        type="button"
        onClick={true}
      >
        Close
      </Button>
    </div>
  </Modal>;
};

const Profile = () => {
  let title;

  let id = localStorage.getItem("id");
  let token = localStorage.getItem("token");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastame] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [note, setNote] = useState("");
  const [img, setImg] = useState("");

  const [sfirstName, ssetFirstName] = useState("");
  const [slastName, ssetLastame] = useState("");
  const [susername, ssetUsername] = useState("");
  const [semail, ssetEmail] = useState("");
  const [saddress, ssetAddress] = useState("");
  const [smobile, ssetMobile] = useState("");
  const [scity, ssetCity] = useState("");
  const [sprovince, ssetProvince] = useState("");
  const [snote, ssetNote] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const User = {
      username: username,
      email: email,
      firstname: firstName,
      lastname: lastName,
      mobile: mobile,
      address: address,
      city: city,
      province: province,
      about: note,
    };

    axios
      .post(`http://${config.host}:${config.port}/user/update/` + id, User, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        const warning = res.data.warn;

        if (warning !== null && warning !== undefined) {
          console.log("message is", warning);

          Swal.fire({
            position: "center",
            icon: "info",
            title: "Please Try Again",
            text: warning,
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          // <Notify></Notify>
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Updated",
            showConfirmButton: false,
            timer: 3000,
          });

          getUser();
        }
      })
      .catch((err) => {
        console.log("Error", err);

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error Occured.Please try again",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  const getUser = async () => {
    console.log("id is", localStorage.getItem("id"));
    axios
      .get(`http://${config.host}:${config.port}/user/` + id, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log("res is", res);

        setFirstName(res.data.User.firstname);
        setLastame(res.data.User.lastname);
        setUsername(res.data.User.username);
        setEmail(res.data.User.email);
        setMobile(res.data.User.mobile);
        setAddress(res.data.User.address);
        setCity(res.data.User.city);
        setProvince(res.data.User.province);
        setNote(res.data.User.about);
        setImg(res.data.User.img);

        ssetFirstName(res.data.User.firstname);
        ssetLastame(res.data.User.lastname);
        ssetUsername(res.data.User.username);
        ssetEmail(res.data.User.email);
        ssetMobile(res.data.User.mobile);
        ssetAddress(res.data.User.address);
        ssetCity(res.data.User.city);
        ssetProvince(res.data.User.province);
        ssetNote(res.data.User.about);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <UserHeader
        title="Hello, Admin"
        buttonclr="info"
        image="https://images.unsplash.com/photo-1538905386057-4a5a580c45a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        text="Configue your profile.. "
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          img ||
                          "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="md"
                  >
                    Settings
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Event Reviews</span>
                      </div>
                      {/* <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {sfirstName || " " + " " + slastName || ""}
                    {/* <span className="font-weight-light"></span> */}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {sprovince || ""} {", " + scity ? scity : ""}
                  </div>
                  {/* <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div> */}
                  <hr className="my-4" />
                  <p>{snote || ""}</p>
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My Profile</h3>
                  </Col>
                  <Col className="text-right" xs="4"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastame(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="City"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Province
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Mobile Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        type="textarea"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                      <Button className="my-4" color="primary" type="submit">
                        Update Profile
                      </Button>
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
