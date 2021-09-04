import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import styled from "styled-components";
import axios from "axios";
import Card05 from "./Card05";

//card component

const CardContainer = styled.div`
  padding: 20px;
  padding-left: 80px;
  position: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 850px);
  grid-gap: 30px;
  grid-auto-rows: 400px;
  grid-template-rows: 650px 400px 400px;
  & > div {
    grid-column: span 3;
    &:nth-child(5),
    &:nth-child(6) {
      grid-column: span 2;
    }
    &:nth-child(8) {
      grid-column: span 4;
    }
    &:nth-child(14) {
      grid-column: span 4;
    }
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-gap: 50px;
    padding: 10px;
    & > div {
      grid-column: span 1 !important;
    }
  }
`;

const EventContainer = styled.div`
 
  padding:30px;
  position: center;
  padding-bottom: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
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

export default function Tables() {
  const { id } = useParams();
  const [event, setEvents] = useState("");
  const [tickets, setTickets] = useState([]);

  const getEvent = () => {
    let token = localStorage.getItem("token");

    axios
      .get(`http://localhost:443/event/` + id, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log("res is", res.data.data);

        setEvents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTickets = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:443/ticket/byEvent/` + id, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log("Ticket Response: ", res.data.data);

        let warning = res.data.warn;

        if (warning !== null && warning !== undefined) {
          console.log("message is", warning);
        } else {
          setTickets(res.data.data);

          console.log("event id", this.state.tickets);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getEvent();
    getTickets();
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
                <h3 className="mb-0">Tickets</h3>

                <Button
                  style={{ float: "right" }}
                  className="btn-icon btn-3"
                  color="primary"
                  type="button"
                  onClick={() => {
                    window.location = "http://localhost:3001/add-ticket/" + id;
                  }}
                >
                  <span className="btn-inner--icon">
                    <i className="ni ni-fat-add" />
                  </span>
                  <span className="btn-inner--text">Add New Ticket</span>
                </Button>
              </CardHeader>
              <CardBody>
                {tickets.length == 0 && <div>No tickets are available!</div>}
                {tickets.length != 0 && (
                  <>
                    <CardContainer>
                      <EventContainer>
                        {tickets.map((entryCurrent) => {
                          return (
                            <Card05
                              key={entryCurrent._id}
                              ticketId={entryCurrent._id}
                              title={entryCurrent.ticketName}
                              cta="Edit Ticket"
                              tagBg={entryCurrent.ticketColor}
                              bgPhoto={event.img}
                              subtitle={entryCurrent.ticketFinalePrice}
                              tag={
                                entryCurrent.ticketType == 1 ? "Paid" : "Free"
                              }
                              commision={entryCurrent.commission * 100}
                              payType={entryCurrent.payType}
                              qty={entryCurrent.ticketAvailableQty}
                            />
                          );
                        })}
                      </EventContainer>
                    </CardContainer>
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
