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
      _id: "60ff1cde9516ed38642a614f",
      eventId: "60ff0fd61b81bd4940168041",
      eventName: "book house 2021",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 400,
      ticketNamedPrice: 100,
      ticketName: "Premium",
      ticketQty: "4",
      ticketId: "60ff10041b81bd4940168044",
      createdAt: "2021-07-26T20:36:46.563Z",
      updatedAt: "2021-07-26T20:36:46.563Z",
      __v: 0,
    },
    {
      _id: "61006142c103b15a6831c670",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 31.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "3",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T19:40:50.805Z",
      updatedAt: "2021-07-27T19:40:50.805Z",
      __v: 0,
    },
    {
      _id: "6100618708766b78487d29cd",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 31.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "3",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T19:41:59.341Z",
      updatedAt: "2021-07-27T19:41:59.341Z",
      __v: 0,
    },
    {
      _id: "6100620f08766b78487d29cf",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 31.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "3",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T19:44:15.270Z",
      updatedAt: "2021-07-27T19:44:15.270Z",
      __v: 0,
    },
    {
      _id: "6100648411f64c7cd469f215",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 31.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "3",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T19:54:44.337Z",
      updatedAt: "2021-07-27T19:54:44.337Z",
      __v: 0,
    },
    {
      _id: "61006528a9fc7901cc158f2c",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 31.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "3",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T19:57:28.812Z",
      updatedAt: "2021-07-27T19:57:28.812Z",
      __v: 0,
    },
    {
      _id: "610065a85f00618b84cf3b9c",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 10.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "1",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T19:59:36.965Z",
      updatedAt: "2021-07-27T19:59:36.965Z",
      __v: 0,
    },
    {
      _id: "61006626a3cc456c6c3ec71a",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 10.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "1",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T20:01:42.576Z",
      updatedAt: "2021-07-27T20:01:42.576Z",
      __v: 0,
    },
    {
      _id: "61006682c8934427a02de42f",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 10.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "1",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T20:03:14.275Z",
      updatedAt: "2021-07-27T20:03:14.275Z",
      __v: 0,
    },
    {
      _id: "610066b70a19cd27a8de0996",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 10.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "1",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T20:04:07.165Z",
      updatedAt: "2021-07-27T20:04:07.165Z",
      __v: 0,
    },
    {
      _id: "610066f0a9ec934910944cd3",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 21,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "2",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T20:05:04.367Z",
      updatedAt: "2021-07-27T20:05:04.367Z",
      __v: 0,
    },
    {
      _id: "6100673e727a53848014a07c",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 31.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "3",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T20:06:22.219Z",
      updatedAt: "2021-07-27T20:06:22.219Z",
      __v: 0,
    },
    {
      _id: "6100674a727a53848014a07d",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 31.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "3",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T20:06:34.931Z",
      updatedAt: "2021-07-27T20:06:34.931Z",
      __v: 0,
    },
    {
      _id: "61006756727a53848014a07e",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 31.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "3",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T20:06:46.108Z",
      updatedAt: "2021-07-27T20:06:46.108Z",
      __v: 0,
    },
    {
      _id: "61006762727a53848014a07f",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60c07e15cd159e10a8c8155d",
      username: "Kamal",
      payAmount: 10.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "1",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-27T20:06:58.723Z",
      updatedAt: "2021-07-27T20:06:58.723Z",
      __v: 0,
    },
  ],
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
      .get(`http://localhost:443/booking/user/` + localStorage.getItem("id"))
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
          <div className="header-body">{/* Card stats */}</div>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow" style={{ marginTop: "50px" }}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Bookings</h3>
                  </div>
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Event name</th>
                    <th scope="col">Total Payment</th>
                    <th scope="col">Ticket Name</th>
                    <th scope="col">Ticket Price</th>
                    <th scope="col">Total Qty</th>
                  </tr>
                </thead>

                {eventDetails.data.map((aevent) => {
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{aevent.eventName}</th>
                        <td>{aevent.payAmount}</td>
                        <td>{aevent.ticketName}</td>
                        <td>{aevent.ticketNamedPrice}</td>
                        <td>{aevent.ticketQty}</td>
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
