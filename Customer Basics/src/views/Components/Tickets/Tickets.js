import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// react component that copies the given text inside your clipboard

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

import styled from "styled-components";
import axios from "axios";
import Card05 from "./Card05";

//card component

const ticketsSample = {
  success: true,
  data: [
    {
      _id: "61011a5d6db22765c427dbfd",
      ticketName: "Premium",
      ticketColor: "#ff9800",
      ticketType: "1",
      ticketNamedPrice: 30,
      ticketFinalePrice: 30,
      ticketAvailableQty: 200,
      ticketMaxPerQty: 10,
      payType: "2",
      commission: 0.05,
      eventId: "610119cd6db22765c427dbf7",
      createdAt: "2021-07-28T08:50:37.438Z",
      updatedAt: "2021-07-28T08:50:37.438Z",
      __v: 0,
    },
    {
      _id: "61011a376db22765c427dbfc",
      ticketName: "Balcony -01",
      ticketColor: "#03a9f4",
      ticketType: "1",
      ticketNamedPrice: 10,
      ticketFinalePrice: 10.5,
      ticketAvailableQty: 250,
      ticketMaxPerQty: 10,
      payType: "1",
      commission: 0.05,
      eventId: "610119cd6db22765c427dbf7",
      createdAt: "2021-07-28T08:49:59.923Z",
      updatedAt: "2021-07-28T08:49:59.923Z",
      __v: 0,
    },
  ],
};

const CardContainer = styled.div`
  padding: 20px;

  position: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 1000px);
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
  @media screen and (max-width: 100px) {
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
  
  display: grid;
  grid-template-columns: repeat(auto-fill,80px);
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
  const [event, setEvents] = useState([]);
  const [tickets, setTickets] = useState(ticketsSample);

  const getEvent = () => {
    let token = localStorage.getItem("token");

    axios
      .get(`http://localhost:443/event/` + id, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log("res event is", res.data.data);
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
        console.log("Ticket Response: ", res.data.data.length);

        let warning = res.data.warn;

        if (warning !== null && warning !== undefined) {
          console.log("message is", warning);
        } else {
          setTickets(res.data);

          setEvents(res.data.data);

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
      {tickets.data && (
        <CardContainer>
          <EventContainer>
            {tickets.data.map((entryCurrent) => {
              return (
                <Card05
                  eventId={id}
                  key={entryCurrent._id}
                  ticketId={entryCurrent._id}
                  title={entryCurrent.ticketName}
                  cta="Book Ticket"
                  tagBg={entryCurrent.ticketColor}
                  bgPhoto={event.img}
                  subtitle={entryCurrent.ticketFinalePrice}
                  tag={entryCurrent.ticketType == 1 ? "Paid" : "Free"}
                  commision={entryCurrent.commission * 100}
                  payType={entryCurrent.payType}
                  qty={entryCurrent.ticketAvailableQty}
                />
              );
            })}
          </EventContainer>
        </CardContainer>
      )}{" "}
    </>
  );
}
