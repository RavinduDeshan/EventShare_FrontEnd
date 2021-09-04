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

import React, { useEffect, useState, Fragment } from "react";

import axios from "axios";

import { useParams, Link } from "react-router-dom";
import EventCard from "../EventCard";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import ReactPDF from "@react-pdf/renderer";
import { Table } from "@material-ui/core";
import { data } from "jquery";
import { fn } from "moment";
// reactstrap components

Font.register({
  family: "Montserrat",
  src: "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
});

Font.register({
  family: "Raleway",
  src: "http://fonts.gstatic.com/s/raleway/v11/bIcY3_3JNqUVRAQQRNVteQ.ttf",
});

let dataArr = {
  AllTickets: [
    {
      _id: "60ff0f3e1b81bd4940168040",
      ticketName: "Basic",
      ticketColor: "#009688",
      ticketType: "1",
      ticketNamedPrice: 10,
      ticketFinalePrice: 10.5,
      ticketAvailableQty: 0,
      ticketMaxPerQty: 3,
      payType: "1",
      commission: 0.05,
      eventId: "60ff0f181b81bd494016803c",
      createdAt: "2021-07-26T19:38:38.350Z",
      updatedAt: "2021-07-27T20:06:59.390Z",
      __v: 0,
    },
  ],
  BestTicket: [
    {
      _id: "60ff0f3e1b81bd4940168040",
      ticketName: "Basic",
      ticketColor: "#009688",
      ticketType: "1",
      ticketNamedPrice: 10,
      ticketFinalePrice: 10.5,
      ticketAvailableQty: 0,
      ticketMaxPerQty: 3,
      payType: "1",
      commission: 0.05,
      eventId: "60ff0f181b81bd494016803c",
      createdAt: "2021-07-26T19:38:38.350Z",
      updatedAt: "2021-07-27T20:06:59.390Z",
      __v: 0,
    },
  ],
  BookingArray: [
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
      _id: "60ff14b040c09b108c071373",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60fc05342a8806397c070de5",
      username: "Ravindu",
      payAmount: 31.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "3",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-26T20:01:52.426Z",
      updatedAt: "2021-07-26T20:01:52.426Z",
      __v: 0,
    },
    {
      _id: "60ff142bb4e4731114a04fee",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60fc05342a8806397c070de5",
      username: "Ravindu",
      payAmount: 31.5,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "3",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-26T19:59:39.022Z",
      updatedAt: "2021-07-26T19:59:39.022Z",
      __v: 0,
    },
    {
      _id: "60ff134d23ae0323e0d86ca5",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60fc05342a8806397c070de5",
      username: "Ravindu",
      payAmount: 21,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "2",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-26T19:55:57.067Z",
      updatedAt: "2021-07-26T19:55:57.067Z",
      __v: 0,
    },
    {
      _id: "60ff11bd6e66024f2cb340c4",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60fc05342a8806397c070de5",
      username: "Ravindu",
      payAmount: 21,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "2",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-26T19:49:17.752Z",
      updatedAt: "2021-07-26T19:49:17.752Z",
      __v: 0,
    },
    {
      _id: "60ff115d1b81bd4940168048",
      eventId: "60ff0f181b81bd494016803c",
      eventName: "Vertigo",
      userId: "60fc05342a8806397c070de5",
      username: "Ravindu",
      payAmount: 21,
      ticketNamedPrice: 10,
      ticketName: "Basic",
      ticketQty: "2",
      ticketId: "60ff0f3e1b81bd4940168040",
      createdAt: "2021-07-26T19:47:41.239Z",
      updatedAt: "2021-07-26T19:47:41.239Z",
      __v: 0,
    },
  ],
  EventDetails: {
    tags: ["music", "vertigo"],
    tickets: ["60ff0f3e1b81bd4940168040"],
    reviews: [],
    _id: "60ff0f181b81bd494016803c",
    name: "Vertigo",
    category: "Music Concert",
    date: "2021-07-30T19:36:00.000Z",
    time: "15:09",
    duration: "60",
    description: "xcvb",
    contact: "123456",
    img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328279/by6whynp29dixjwlqldf.jpg",
    coordinates: {
      lat: 6.9108534,
      lng: 79.8633728,
    },
    address: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
    city: "110 Ananda Coomaraswamy Mawatha, Colombo 00700, Sri Lanka",
    province: "Western Province",
    country: "Sri Lanka",
    premise: null,
    organizer: "60c07e15cd159e10a8c8155d",
    totBookings: 19,
    payToPlatform: 22.575,
    totRevenue: 451.5,
    payToHost: 190,
    rates: [
      {
        _id: "60fff76b0f91e94650d6a1fd",
      },
    ],
    createdAt: "2021-07-26T19:38:00.609Z",
    updatedAt: "2021-07-28T05:12:13.504Z",
    __v: 2,
    visits: 65,
  },
};

const BORDER_COLOR = "#bfbfbf";
const BORDER_STYLE = "solid";
const COL1_WIDTH = 5;
const COLN_WIDTH = (120 - COL1_WIDTH) / 6;
const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol1Header: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 3,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 3,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 1300,
    fontWeight: "extrabold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Raleway",
    fontWeight: "bold",
    marginBottom: 4,
    color: "#7E57C2",
  },
  docSubtitle: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Raleway",
    fontWeight: "bold",
    marginTop: 200,
  },
  docTitle: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 200,
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 2,
  },

  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    color: "#9575CD",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  subImage: {
    marginVertical: 10,
    marginHorizontal: 440,
    height: "30px",
    width: "130px",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

function getToday() {
  let date = new Date();
  console.log("date is ", date.toISOString().substring(0, 10));
  return date.toString().substring(0, 10);
}

function getTime() {
  let date = new Date();
  console.log("date is ", date.toISOString());
  return date.toString().substring(17, 32);
}

const PDF = () => {
  let { id } = useParams();

  const [DataArr, setData] = useState(dataArr);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  //   const [tokenP, setToken] = useState(token ? token : "000");
  //   const [usernameP, setUsername] = useState(username ? username : "000");

  // alert(usernameP);

  //   const getUser = () => {
  //     setId(id);
  //     setToken(token);
  //     setUsername(username);
  //   };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:443/report/event-summary/` + id)

      .then((res) => {
        console.log("=============data=============");
        console.log(res.data);
        console.log("====================================");
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  let i = 0;

  return (
    <PDFViewer height="1000px" width="100%">
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed></Text>
          <Image
            style={styles.image}
            src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
          />
          <Text style={styles.docTitle}> Event Summary Report</Text>
          <Text style={styles.docTitle}> {DataArr.EventDetails.name}</Text>
          <Text style={styles.docSubtitle}>Event Hosting Portal</Text>
          <Text style={styles.author}>
            Generated By User: {localStorage.getItem("username")}
          </Text>
          <Text style={styles.author}>Generated Date: {getToday()}</Text>
          <Text style={styles.author}>Generated Time: {getTime()}</Text>
          {/* {events.map((entryCurrent) => {
              return (
                <Text style={styles.subtitle}>{entryCurrent.category}</Text>
              );
            })} */}

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>

        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            ~Event Summary Report~
          </Text>
          <Image
            style={styles.subImage}
            src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
          />
          <Text style={styles.title}>Ticket Details</Text>
          <Text style={styles.text}>
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
            mucho tiempo que vivía un hidalgo de los de lanza en astillero,
            adarga antigua, rocín flaco y galgo corredor. Una olla de algo más
            vaca que carnero, salpicón las más noches, duelos y quebrantos los
            sábados, lentejas loxxlomino de añadidura los domingos, consumían
            las tres partes de su hacienda. El resto della concluían sayo de
            velarte, calzas de velludo para las fiestas con sus pantuflos de lo
            mismo, los días de entre semana se honraba con su vellori de lo más
            fino. Tenía en su casa una ama que pasaba de los cuarenta, y
          </Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1Header}>
                <Text style={styles.tableCellHeader}>No</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Ticket Name</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Ticket Price</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Bookings</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Commission</Text>
              </View>

              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Availability</Text>
              </View>
            </View>

            {DataArr.AllTickets &&
              DataArr.AllTickets.map((item) => {
                i++;
                return (
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                      <Text style={styles.tableCell}>{i}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.ticketName}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {item.ticketNamedPrice}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.bookings}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {item.commission * 100}%
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {item.ticketAvailableQty}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </View>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            ~Event Summary Report~
          </Text>
          <Image
            style={styles.subImage}
            src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
          />
          <Text style={styles.title}>Event Bookings</Text>
          <Text style={styles.text}>
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
            mucho tiempo que vivía un hidalgo de los de lanza en astillero,
            adarga antigua, rocín flaco y galgo corredor. Una olla de algo más
            vaca que carnero, salpicón las más noches, duelos y quebrantos los
            sábados, lentejas loxxlomino de añadidura los domingos, consumían
            las tres partes de su hacienda. El resto della concluían sayo de
            velarte, calzas de velludo para las fiestas con sus pantuflos de lo
            mismo, los días de entre semana se honraba con su vellori de lo más
            fino. Tenía en su casa una ama que pasaba de los cuarenta, y
          </Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1Header}>
                <Text style={styles.tableCellHeader}>No</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Event Name</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Ticket Price</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Booked Qty</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total Pay</Text>
              </View>
            </View>

            {DataArr.BookingArray &&
              DataArr.BookingArray.map((item, i = 0) => {
                i++;
                return (
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                      <Text style={styles.tableCell}>{i}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.ticketName}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {item.ticketNamedPrice}$
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.ticketQty}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.payAmount}$</Text>
                    </View>
                  </View>
                );
              })}
          </View>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>

        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            ~Event Summary Report~
          </Text>
          <Image
            style={styles.subImage}
            src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
          />
          <Text style={styles.title}>Report Summary</Text>

          <Text style={styles.text}>
            En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
            mucho tiempo que vivía un hidalgo de los de lanza en astillero,
            adarga antigua, rocín flaco y galgo corredor. Una olla de algo más
            vaca que carnero, salpicón las más noches, duelos y quebrantos los
            sábados, lentejas loxxlomino de añadidura los domingos, consumían
            las tres partes de su hacienda. El resto della concluían sayo de
            velarte, calzas de velludo para las fiestas con sus pantuflos de lo
            mismo, los días de entre semana se honraba con su vellori de lo más
            fino. Tenía en su casa una ama que pasaba de los cuarenta, y
          </Text>

          <Text style={styles.itemTopic}>
            Best Selling Ticket :{" "}
            {DataArr.BestTicket && DataArr.BestTicket[0].ticketName}
          </Text>

          <Text style={styles.text}>
            Ticket Name:{" "}
            {DataArr.BestTicket && DataArr.BestTicket[0].ticketName}
          </Text>
          <Text style={styles.text}>
            Bookings:
            {DataArr.BestTicket && DataArr.BestTicket[0].bookings}
          </Text>
          <Text style={styles.text}>
            Price :
            {DataArr.BestTicket && DataArr.BestTicket[0].ticketFinalePrice}$
          </Text>

          <Text style={styles.itemTopic}>
            Availability:{" "}
            {DataArr.BestTicket && DataArr.BestTicket[0].ticketAvailableQty}
          </Text>
          <Text style={styles.itemTopic}>
            Limitation, per User Qty:{" "}
            {DataArr.BestTicket && DataArr.BestTicket[0].ticketMaxPerQty}
          </Text>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDF;
