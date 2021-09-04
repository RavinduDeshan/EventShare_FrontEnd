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

import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import swal from "sweetalert";

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
          {/* A small river named Duden flows by their place and supplies it with
          the necessary regelialia. */}
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
  let id = localStorage.getItem("id");
  let token = localStorage.getItem("token");

  const [uId, setUserId] = useState("");
  const [NIC, setNIC] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [img, setImg] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");

  const [sfirstName, ssetFirstName] = useState("");
  const [slastName, ssetLastame] = useState("");
  const [susername, ssetUsername] = useState("");
  const [semail, ssetEmail] = useState("");
  const [saddress, ssetAddress] = useState("");
  const [smobile, ssetMobile] = useState("");
  const [scompany, ssetCompany] = useState("");

  const [snote, ssetNote] = useState("");
  const [simg, ssetImg] = useState("");

  const deleteUser = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once you deleted your account, you will not be able to recover your account! This action is Permenent!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((stat) => {
      if (stat) {
        Swal.fire({
          title: "Enter your Account Password",
          input: "password",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Confirm and Delete",
          showLoaderOnConfirm: true,
          preConfirm: (pass) => {
            const login = {
              username: localStorage.getItem("username"),
              password: pass,
            };

            const response = axios
              .post(`http://${config.host}:${config.port}/user/validate`, login)
              .then((res) => {
                if (res.data.msg) {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Invalid Password",
                    showConfirmButton: false,
                    timer: 3000,
                  });
                } else {
                  let id = uId;

                  axios
                    .delete(
                      `http://${config.host}:${config.port}/host/delete/` + id
                    )
                    .then((res) => {
                      console.log("res", res);

                      swal("Entry Deleted Permenently!", {
                        icon: "success",
                      });

                      window.location.reload();
                    })
                    .catch((err) => {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Error Occured",
                        showConfirmButton: false,
                        timer: 3000,
                      });
                    });
                }
              })
              .catch((err) => {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Invalid Password",
                  showConfirmButton: false,
                  timer: 3000,
                });
              });
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });

        ///block

        ///block
      } else {
        swal({
          title: "Terminated",
          text: "Entry Deletion Terminated!",
          icon: "info",
          button: "ok",
        });
      }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const User = {
      companyEmail: email,
      nic: NIC,
      category: category,
      company: company,
      companyMobile: mobile,
      companyAddress: address,
      companyCity: city,
      designation: designation,
      companyDescription: note,
      companyImg: img,
      category: category,
    };

    axios
      .post(
        `http://${config.host}:${config.port}/host/update/` + username,
        User,
        {
          headers: {
            token: token,
          },
        }
      )
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
      .get(`http://${config.host}:${config.port}/host/` + id, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log("res is", res);

        setUserId(res.data.User.userId);
        setNIC(res.data.User.nic);
        setUsername(res.data.User.username);
        setEmail(res.data.User.companyEmail);
        setMobile(res.data.User.companyMobile);
        setAddress(res.data.User.companyAddress);
        setCity(res.data.User.companyCity);
        setCategory(res.data.User.category);
        setDesignation(res.data.User.designation);
        setNote(res.data.User.companyDescription);
        setImg(res.data.User.companyImg);
        setCompany(res.data.User.company);

        ssetUsername(res.data.User.username);

        ssetMobile(res.data.User.companyMobile);
        ssetImg(res.data.User.companyImg);
        ssetCompany(res.data.User.company);

        ssetNote(res.data.User.companyDescription);
      })
      .catch((err) => {
        window.location = "http://localhost:3000/account/index";
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <UserHeader
        title="Hello,"
        buttonclr="warning"
        link={"http://localhost:3001/event-registry/" + id}
        btntitle="host an event"
        image="https://billetto.co.uk/blog/wp-content/uploads/2019/04/hanny-naibaho-388579-unsplash-e1554461063517.jpg"
        text="Host an Event"
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
                          simg ||
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
                  <Button
                    className="float-right"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => {
                      deleteUser(localStorage.getItem("id"));
                    }}
                    size="md"
                  >
                    Deactivate
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Followers</span>
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
                    {scompany}
                    {/* <span className="font-weight-light"></span> */}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {susername}
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
                  <p>{snote}</p>
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
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    Account information
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
                            // onChange={(e)=>setUsername(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Company Email Address
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
                            NIC
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            value={NIC}
                            // onChange={(e)=>setNIC(e.target.value)}
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
                            Company
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Company Category
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            type="select"
                          >
                            <option value="Entertainment">Entertainment</option>
                            <option value="Media">Media</option>
                            <option value="Government">Government</option>
                            <option value="School Society / Association">
                              School Society / Association
                            </option>
                            <option value="other">other</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Event Host's Designation
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
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
                  <h6 className="heading-small text-muted mb-4">
                    About Company
                  </h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Description</label>
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
