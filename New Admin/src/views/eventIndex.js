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

import Header from "components/Headers/Header.js";

const sampleSummary = {
  BestTicket: [
    {
      _id: "60ff10a31b81bd4940168047",
      ticketName: "Basic",
      ticketColor: "#00bcd4",
      ticketType: "1",
      ticketNamedPrice: 13,
      ticketFinalePrice: 13.65,
      ticketAvailableQty: 1000,
      ticketMaxPerQty: 2,
      payType: "1",
      commission: 0.05,
      eventId: "60ff10881b81bd4940168045",
      createdAt: "2021-07-26T19:44:35.424Z",
      updatedAt: "2021-07-26T19:44:35.424Z",
      __v: 0,
    },
  ],
  BookingArray: [
    {
      _id: "60ff18b9cddca830c085d209",
      eventId: "60ff10881b81bd4940168045",
      eventName: "it18032598",
      userId: "60fc05342a8806397c070de5",
      username: "Ravindu",
      payAmount: 13.65,
      ticketNamedPrice: 13,
      ticketName: "Basic",
      ticketQty: "1",
      ticketId: "60ff10a31b81bd4940168047",
      createdAt: "2021-07-26T20:19:05.962Z",
      updatedAt: "2021-07-26T20:19:05.962Z",
      __v: 0,
    },
    {
      _id: "60ff1882e43e5b781cd1964e",
      eventId: "60ff10881b81bd4940168045",
      eventName: "it18032598",
      userId: "60fc05342a8806397c070de5",
      username: "Ravindu",
      payAmount: 13.65,
      ticketNamedPrice: 13,
      ticketName: "Basic",
      ticketQty: "1",
      ticketId: "60ff10a31b81bd4940168047",
      createdAt: "2021-07-26T20:18:10.635Z",
      updatedAt: "2021-07-26T20:18:10.635Z",
      __v: 0,
    },
    {
      _id: "60ff1835602a5c73c05bf180",
      eventId: "60ff10881b81bd4940168045",
      eventName: "it18032598",
      userId: "60fc05342a8806397c070de5",
      username: "Ravindu",
      payAmount: 13.65,
      ticketNamedPrice: 13,
      ticketName: "Basic",
      ticketQty: "1",
      ticketId: "60ff10a31b81bd4940168047",
      createdAt: "2021-07-26T20:16:53.845Z",
      updatedAt: "2021-07-26T20:16:53.845Z",
      __v: 0,
    },
    {
      _id: "60ff16927a4c3346f8b5f1f9",
      eventId: "60ff10881b81bd4940168045",
      eventName: "it18032598",
      userId: "60fc05342a8806397c070de5",
      username: "Ravindu",
      payAmount: 13.65,
      ticketNamedPrice: 13,
      ticketName: "Basic",
      ticketQty: "1",
      ticketId: "60ff10a31b81bd4940168047",
      createdAt: "2021-07-26T20:09:54.579Z",
      updatedAt: "2021-07-26T20:09:54.579Z",
      __v: 0,
    },
    {
      _id: "60ff16215d186b4eb8e69db8",
      eventId: "60ff10881b81bd4940168045",
      eventName: "it18032598",
      userId: "60fc05342a8806397c070de5",
      username: "Ravindu",
      payAmount: 27.3,
      ticketNamedPrice: 13,
      ticketName: "Basic",
      ticketQty: "2",
      ticketId: "60ff10a31b81bd4940168047",
      createdAt: "2021-07-26T20:08:01.631Z",
      updatedAt: "2021-07-26T20:08:01.631Z",
      __v: 0,
    },
  ],
  EventDetails: {
    tags: ["music", "ultra music festival 2021"],
    tickets: ["60ff10a31b81bd4940168047"],
    reviews: [],
    _id: "60ff10881b81bd4940168045",
    name: "it18032598",
    category: "Music Concert",
    date: "2021-07-30T19:42:00.000Z",
    time: "16:15",
    duration: "60",
    description: "sdfghjkl",
    contact: "2345678",
    img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328647/qzflzyvcb3m0oeeek4ew.jpg",
    coordinates: {
      lat: 6.847491199999999,
      lng: 79.9242548,
    },
    address: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
    city: "Youth Center Theater Budling, Maharagama 10280, Sri Lanka",
    province: "Western Province",
    country: "Sri Lanka",
    premise: "Youth Center Theater Budling",
    organizer: "60c07e15cd159e10a8c8155d",
    totBookings: 5,
    payToPlatform: 4.095000000000001,
    totRevenue: 81.9,
    payToHost: 65,
    rates: [
      {
        _id: "61006958727a53848014a080",
      },
    ],
    createdAt: "2021-07-26T19:44:08.558Z",
    updatedAt: "2021-07-27T23:28:15.296Z",
    __v: 2,
    visits: 12,
  },
};

let CharData = {
  labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
    },
  ],
};
const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [eventDetails, setEventsSummary] = useState(sampleSummary);
  let { id } = useParams();

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
      .get(`http://localhost:443/report/events-summary/` + id)
      .then((res) => {
        setEventsSummary(res.data);
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
                          Total Revenue
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {eventDetails.EventDetails.totRevenue} $
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
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Hosting Revenue
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {eventDetails.EventDetails.payToHost}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Bookings
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {eventDetails.EventDetails.totBookings}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Col lg="6" xl="3">
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
                              window.open(
                                "http://localhost:3003/pdf-sales",
                                "_blank" // <- This is what makes it open in a new window.
                              );
                            }}
                          >
                            Event Sales Summary
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
                              window.open(
                                "http://localhost:3003/pdf-trends",
                                "_blank" // <- This is what makes it open in a new window.
                              );
                            }}
                          >
                            Trendings
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span> */}
                    </p>
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
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Tickets Summary</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="md"
                      onClick={() => {
                        window.location =
                          "http://localhost:3000/host/tickets/" + id;
                      }}
                    >
                      See all Tickets
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Event name</th>
                    <th scope="col">Ticket Type</th>
                    <th scope="col">Total Finale Price</th>
                    <th scope="col">Total Available Qty</th>
                    <th scope="col">Total Revenue</th>
                  </tr>
                </thead>

                {eventDetails.AllTickets &&
                  eventDetails.AllTickets.map((aevent) => {
                    return (
                      <tbody>
                        <tr>
                          <th scope="row">{aevent.ticketName}</th>
                          <td>{aevent.ticketType}</td>

                          <td>{aevent.ticketFinalePrice} </td>
                          <td>{aevent.ticketAvailableQty}</td>
                          <td>{aevent.ticketAvailableQty * aevent.bookings}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                {!eventDetails.AllTickets && (
                  <tbody>
                    <tr>
                      <td>No tickets available to show</td>
                    </tr>
                  </tbody>
                )}
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Ticket Booking Summary</h3>
                  </div>
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Ticket Name</th>
                    <th scope="col">Tickets Type</th>
                    <th scope="col">Ticket Qty</th>
                  </tr>
                </thead>

                {eventDetails.BookingArray.map((aevent) => {
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{aevent.ticketName}</th>
                        <td>{aevent.ticketName}</td>
                        <td>{aevent.ticketQty}</td>
                      </tr>
                      {/* <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr> */}
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
