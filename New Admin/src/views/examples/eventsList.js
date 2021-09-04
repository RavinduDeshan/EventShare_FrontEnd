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
import React, { useState, useEffect } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import EventCard from "./EventCard";
import styled from "styled-components";
import axios from "axios";

//card component

const EventContainer = styled.div`
  padding: 150px;
  
  position: center
  padding-bottom: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 50px;
  grid-auto-rows: 100px;
  grid-template-rows: 300px 300px 300px;
  & > div {
    grid-column: span 2;
    
  
    }
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-gap: 50px;
    padding: 20px;
    & > div {
      grid-column: span 2 !important;
    }
  }
`;

const Icons = () => {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    let token = localStorage.getItem("token");
    let keyH = localStorage.getItem("id");

    console.log("key", keyH);

    axios
      .get(`http://localhost:443/event/byHost/` + keyH)
      .then((res) => {
        console.log("res is", res.data.data);

        setEvents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Events</h3>
              </CardHeader>
              <CardBody>
                <EventContainer>
                  {events.map((entryCurrent) => {
                    return (
                      <EventCard
                        key={entryCurrent._id}
                        eventId={entryCurrent._id}
                        // event={}
                        title={entryCurrent.name}
                        // subtitle={entryCurrent.description}

                        iconName="fa fa-chevron-circle-down"
                        btnIcon="fas fa-arrow-right"
                        bgPhoto={entryCurrent.img}
                        subtitle={entryCurrent.date.substring(0, 10)}
                        tag={entryCurrent.time}
                      />
                    );
                  })}
                </EventContainer>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
