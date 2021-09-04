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

import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";

// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  Badge,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

const sampleSummary = {
  success: true,
  data: [
    {
      notifications: ["6101216e6db22765c427dc03"],
      _id: "6101177b6db22765c427dbf4",
      username: "Ravindu",
      password: "$2b$10$93jYg2kQQLrocTi/3MI2U.V3Kb50436c8FOJFp1kKY9mvdzN5ptIi",
      email: "ravioscar1@gmail.com",
      firstname: "Ravindu",
      lastname: "Deshan",
      bookings: 0,
      categories: [],
      __v: 1,
    },
    {
      notifications: [],
      _id: "610118d66db22765c427dbf6",
      username: "admin98765432375",
      password: "$2b$10$kvaWEChu6Ycwt6.iWrLPaePFaSO3pwz2iBnvq2R.euzQh1ArsSaeO",
      email: "info.pegasadvertising@gmail.com",
      firstname: "admin",
      lastname: "Admin",
      bookings: 0,
      categories: [],
      __v: 0,
    },
    {
      notifications: [],
      _id: "61011cf56db22765c427dbff",
      username: "Ravinduss",
      password: "$2b$10$meJg/j3dW.KS54G0r.h.2eEPllDgWXtjk6DjWiPVnaett8sesDiGi",
      email: "rameshjj@gmail.comm",
      firstname: "Kamal",
      lastname: "Ravindu",
      bookings: 0,
      categories: [
        {
          _id: "61011d6c6db22765c427dc01",
          name: "Music Concert",
          score: 3,
        },
      ],
      __v: 1,
    },
  ],
};
const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [eventDetails, setEventsSummary] = useState([sampleSummary]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const getDetails = () => {
    axios
      .get(`http://localhost:443/user/`)
      .then((res) => {
        setEventsSummary(res.data.data);

        console.log("Wanted Format ", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails();
    // validatePush();
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {eventDetails && eventDetails.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="9">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Generate Reports
                        </CardTitle>
                      </div>
                    </Row>

                    <Button
                      style={{
                        width: "300px",
                        borderRadius: "100px",
                        marginTop: "10px",
                      }}
                      className="mr-4"
                      color="primary"
                      href="#host-event"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Event Payments Summary
                    </Button>

                    <Button
                      style={{
                        width: "300px",
                        borderRadius: "100px",
                        marginTop: "10px",
                      }}
                      className="mr-4"
                      color="primary"
                      href="#host-event"
                      onClick={(e) => {
                        window.open(
                          "http://localhost:3003/pdf",
                          "_blank" // <- This is what makes it open in a new window.
                        );
                      }}
                    >
                      Event Summary
                    </Button>

                    <Button
                      style={{
                        width: "300px",
                        borderRadius: "100px",
                        marginTop: "10px",
                      }}
                      className="mr-4"
                      color="primary"
                      href="#host-event"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Trendings
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Booking Customers</h3>
                  </div>
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Total Bookings</th>
                  </tr>
                </thead>

                {eventDetails &&
                  eventDetails.map((aevent) => {
                    return (
                      <tbody>
                        <tr>
                          <th scope="row">{aevent.username}</th>

                          <td>{aevent.firstname}</td>
                          <td>{aevent.email}</td>
                          <td>
                            {aevent.bookings < 20 && (
                              <>
                                <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                                {aevent.bookings}
                              </>
                            )}

                            {aevent.bookings > 20 && (
                              <>
                                <i className="fas fa-arrow-up text-success mr-3" />{" "}
                                {aevent.bookings}
                              </>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
