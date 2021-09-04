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
  TotalRevenue: 635,
  TotalToPlatform: 46.67,
  AllEvents: [
    {
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
    {
      tags: ["book", "music"],
      tickets: ["60ff10041b81bd4940168044"],
      reviews: [],
      _id: "60ff0fd61b81bd4940168041",
      name: "book house 2021",
      category: "Celebration",
      date: "2021-07-30T19:39:00.000Z",
      time: "14:11",
      duration: "240",
      description: "sdfghjk",
      contact: "345678890",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328469/qtnxzgrs7duuiufsfksj.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 1,
      payToPlatform: 20,
      totRevenue: 400,
      payToHost: 380,
      rates: [],
      createdAt: "2021-07-26T19:41:10.792Z",
      updatedAt: "2021-07-28T05:10:36.371Z",
      __v: 1,
      visits: 5,
    },
    {
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
      updatedAt: "2021-07-28T00:05:38.021Z",
      __v: 2,
      visits: 13,
    },
    {
      tags: ["vertigo", "music"],
      tickets: ["60ff1963cddca830c085d20c"],
      reviews: [],
      _id: "60ff194dcddca830c085d20a",
      name: "Ravindu",
      category: "Festival",
      date: "2021-07-30T20:20:00.000Z",
      time: "15:52",
      duration: "120",
      description: "sdfghj",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627330892/vjn12udjzdsg3f1dl429.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-26T20:21:33.850Z",
      updatedAt: "2021-07-28T04:10:28.091Z",
      __v: 1,
      visits: 2,
    },
    {
      tags: ["music", "musicapmmbra"],
      tickets: [],
      reviews: [],
      _id: "610001d60f91e94650d6a1ff",
      name: "vertigoo",
      category: "Gaming",
      date: "2021-07-31T12:52:00.000Z",
      time: "08:24",
      duration: "240",
      description: "dfgh",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627390421/eglvp6c0ydoglpcmu8pj.jpg",
      coordinates: {
        lat: 6.9016892,
        lng: 79.87337459999999,
      },
      address: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "BMICH Office",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-27T12:53:42.079Z",
      updatedAt: "2021-07-27T12:53:42.863Z",
      __v: 0,
      visits: 0,
    },
    {
      tags: ["cobra"],
      tickets: [],
      reviews: [],
      _id: "61004051b4c99e21c49ef7f7",
      name: "xcvb",
      category: "Meeting",
      date: "2021-07-31T17:19:00.000Z",
      time: "03:33",
      duration: "120",
      description: "zxcvbn",
      contact: "12345",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627406417/ksw0ix1j8dh2i1yzopy4.jpg",
      coordinates: {
        lat: -35.966667,
        lng: 145.65,
      },
      address: "Unnamed Road, Cobram VIC 3644, Australia",
      city: "Unnamed Road, Cobram VIC 3644, Australia",
      province: "Victoria",
      country: "Australia",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      visits: 14,
      rates: [],
      createdAt: "2021-07-27T17:20:17.413Z",
      updatedAt: "2021-07-27T20:10:54.308Z",
      __v: 0,
    },
  ],
  TopGrosssingArray: [
    {
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
    {
      tags: ["book", "music"],
      tickets: ["60ff10041b81bd4940168044"],
      reviews: [],
      _id: "60ff0fd61b81bd4940168041",
      name: "book house 2021",
      category: "Celebration",
      date: "2021-07-30T19:39:00.000Z",
      time: "14:11",
      duration: "240",
      description: "sdfghjk",
      contact: "345678890",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627328469/qtnxzgrs7duuiufsfksj.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 1,
      payToPlatform: 20,
      totRevenue: 400,
      payToHost: 380,
      rates: [],
      createdAt: "2021-07-26T19:41:10.792Z",
      updatedAt: "2021-07-28T05:10:36.371Z",
      __v: 1,
      visits: 5,
    },
    {
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
      updatedAt: "2021-07-28T00:05:38.021Z",
      __v: 2,
      visits: 13,
    },
    {
      tags: ["vertigo", "music"],
      tickets: ["60ff1963cddca830c085d20c"],
      reviews: [],
      _id: "60ff194dcddca830c085d20a",
      name: "Ravindu",
      category: "Festival",
      date: "2021-07-30T20:20:00.000Z",
      time: "15:52",
      duration: "120",
      description: "sdfghj",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627330892/vjn12udjzdsg3f1dl429.jpg",
      coordinates: {
        lat: 6.901555,
        lng: 79.8729015,
      },
      address:
        "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "Main Conference Hall, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "Main Conference Hall",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-26T20:21:33.850Z",
      updatedAt: "2021-07-28T04:10:28.091Z",
      __v: 1,
      visits: 2,
    },
    {
      tags: ["music", "musicapmmbra"],
      tickets: [],
      reviews: [],
      _id: "610001d60f91e94650d6a1ff",
      name: "vertigoo",
      category: "Gaming",
      date: "2021-07-31T12:52:00.000Z",
      time: "08:24",
      duration: "240",
      description: "dfgh",
      contact: "123456789",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627390421/eglvp6c0ydoglpcmu8pj.jpg",
      coordinates: {
        lat: 6.9016892,
        lng: 79.87337459999999,
      },
      address: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      city: "BMICH Office, Bauddhaloka Mawatha, Colombo 00700, Sri Lanka",
      province: "Western Province",
      country: "Sri Lanka",
      premise: "BMICH Office",
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      rates: [],
      createdAt: "2021-07-27T12:53:42.079Z",
      updatedAt: "2021-07-27T12:53:42.863Z",
      __v: 0,
      visits: 0,
    },
    {
      tags: ["cobra"],
      tickets: [],
      reviews: [],
      _id: "61004051b4c99e21c49ef7f7",
      name: "xcvb",
      category: "Meeting",
      date: "2021-07-31T17:19:00.000Z",
      time: "03:33",
      duration: "120",
      description: "zxcvbn",
      contact: "12345",
      img: "http://res.cloudinary.com/fashionistaimage/image/upload/v1627406417/ksw0ix1j8dh2i1yzopy4.jpg",
      coordinates: {
        lat: -35.966667,
        lng: 145.65,
      },
      address: "Unnamed Road, Cobram VIC 3644, Australia",
      city: "Unnamed Road, Cobram VIC 3644, Australia",
      province: "Victoria",
      country: "Australia",
      premise: null,
      organizer: "60c07e15cd159e10a8c8155d",
      totBookings: 0,
      payToPlatform: 0,
      totRevenue: 0,
      payToHost: 0,
      visits: 14,
      rates: [],
      createdAt: "2021-07-27T17:20:17.413Z",
      updatedAt: "2021-07-27T20:10:54.308Z",
      __v: 0,
    },
  ],
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

  itemTopic: {
    margin: 14,
    fontSize: 20,
    textAlign: "justify",
    fontFamily: "Raleway",
    color: "#4A148C",
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
  return date.toString().substring(16, 32);
}

const PDF = () => {
  //   let { id, token, username } = useParams();

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
      .get(`http://localhost:443/report/admin-sales-summary`)

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
          <Text style={styles.docTitle}> Event Sales Report</Text>
          <Text style={styles.docSubtitle}>Administration Portal</Text>
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
            ~Events Sales Report~
          </Text>
          <Image
            style={styles.subImage}
            src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
          />
          <Text style={styles.title}>Top Grossing Events</Text>
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
                <Text style={styles.tableCellHeader}>Category</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Bookings</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total Revenue</Text>
              </View>

              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Commission</Text>
              </View>
            </View>

            {DataArr.TopGrosssingArray &&
              DataArr.TopGrosssingArray.map((item) => {
                i++;
                return (
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                      <Text style={styles.tableCell}>{i}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.category}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.totBookings}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.totRevenue}$</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {item.payToPlatform}$
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
            ~Events Sales Report~
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
            Total Events: {DataArr && DataArr.AllEvents.length}
          </Text>
          <Text style={styles.itemTopic}>
            Total Revenue: {DataArr && DataArr.TotalRevenue}$
          </Text>
          <Text style={styles.itemTopic}>
            Total Commission : {DataArr && DataArr.TotalToPlatform}$
          </Text>
          <Text style={styles.itemTopic}>
            Best Grossing Event:{" "}
            {DataArr.TopGrosssingArray && DataArr.TopGrosssingArray[0].name}
          </Text>
          <Text style={styles.text}>
            Event Name:{" "}
            {DataArr.TopGrosssingArray && DataArr.TopGrosssingArray[0].name}
          </Text>
          <Text style={styles.text}>
            Bookings:
            {DataArr.TopGrosssingArray &&
              DataArr.TopGrosssingArray[0].totBookings}
          </Text>
          <Text style={styles.text}>
            Total Revenue:
            {DataArr.TopGrosssingArray &&
              DataArr.TopGrosssingArray[0].totRevenue}
            $
          </Text>
          <Text style={styles.text}>
            Evenshare Commission:
            {DataArr.TopGrosssingArray &&
              DataArr.TopGrosssingArray[0].payToPlatform}
            $
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
