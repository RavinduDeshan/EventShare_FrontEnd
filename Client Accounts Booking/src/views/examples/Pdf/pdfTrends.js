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
  TrendingCategory: [
    {
      _id: "60ff0f191b81bd494016803d",
      name: "Music Concert",
      hostingScore: 2,
      createdAt: "2021-07-26T19:38:01.189Z",
      updatedAt: "2021-07-27T20:06:59.872Z",
      __v: 0,
      bookingScore: 19,
    },
  ],
  TrendingTag: [
    {
      _id: "60ff0f1a1b81bd494016803e",
      name: "music",
      hostingScore: 5,
      createdAt: "2021-07-26T19:38:02.478Z",
      updatedAt: "2021-07-27T20:07:00.173Z",
      __v: 0,
      bookingScore: 18,
    },
  ],
  TrendingCategories: [
    {
      _id: "60ff0f191b81bd494016803d",
      name: "Music Concert",
      hostingScore: 2,
      createdAt: "2021-07-26T19:38:01.189Z",
      updatedAt: "2021-07-27T20:06:59.872Z",
      __v: 0,
      bookingScore: 19,
    },
    {
      _id: "60ff0fd71b81bd4940168042",
      name: "Celebration",
      hostingScore: 1,
      createdAt: "2021-07-26T19:41:11.288Z",
      updatedAt: "2021-07-26T20:36:47.610Z",
      __v: 0,
      bookingScore: 1,
    },
    {
      _id: "60ff194ecddca830c085d20b",
      name: "Festival",
      hostingScore: 1,
      createdAt: "2021-07-26T20:21:34.237Z",
      updatedAt: "2021-07-26T20:21:34.237Z",
      __v: 0,
    },
    {
      _id: "610001d60f91e94650d6a200",
      name: "Gaming",
      hostingScore: 1,
      createdAt: "2021-07-27T12:53:42.429Z",
      updatedAt: "2021-07-27T12:53:42.429Z",
      __v: 0,
    },
    {
      _id: "61004051b4c99e21c49ef7f8",
      name: "Meeting",
      hostingScore: 1,
      createdAt: "2021-07-27T17:20:17.852Z",
      updatedAt: "2021-07-27T17:20:17.852Z",
      __v: 0,
    },
  ],
  TrendingTags: [
    {
      _id: "60ff0f1a1b81bd494016803e",
      name: "music",
      hostingScore: 5,
      createdAt: "2021-07-26T19:38:02.478Z",
      updatedAt: "2021-07-27T20:07:00.173Z",
      __v: 0,
      bookingScore: 18,
    },
    {
      _id: "60ff0f1a1b81bd494016803f",
      name: "vertigo",
      hostingScore: 2,
      createdAt: "2021-07-26T19:38:02.489Z",
      updatedAt: "2021-07-27T20:07:00.172Z",
      __v: 0,
      bookingScore: 12,
    },
    {
      _id: "60ff108a1b81bd4940168046",
      name: "ultra music festival 2021",
      hostingScore: 1,
      createdAt: "2021-07-26T19:44:10.068Z",
      updatedAt: "2021-07-26T20:19:07.401Z",
      __v: 0,
      bookingScore: 5,
    },
    {
      _id: "60ff0fd71b81bd4940168043",
      name: "book",
      hostingScore: 1,
      createdAt: "2021-07-26T19:41:11.752Z",
      updatedAt: "2021-07-26T20:36:47.970Z",
      __v: 0,
      bookingScore: 1,
    },
    {
      _id: "610001d60f91e94650d6a201",
      name: "musicapmmbra",
      hostingScore: 1,
      createdAt: "2021-07-27T12:53:42.767Z",
      updatedAt: "2021-07-27T12:53:42.767Z",
      __v: 0,
    },
    {
      _id: "61004052b4c99e21c49ef7f9",
      name: "cobra",
      hostingScore: 1,
      createdAt: "2021-07-27T17:20:18.152Z",
      updatedAt: "2021-07-27T17:20:18.152Z",
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
  return date.toString().substring(17, 32);
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
      .get(`http://localhost:443/report/current-trends`)

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
          <Text style={styles.docTitle}> Event Trends Report</Text>
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
            ~Events Trends Report~
          </Text>
          <Image
            style={styles.subImage}
            src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
          />
          <Text style={styles.title}>Top Trending Categories</Text>
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
                <Text style={styles.tableCellHeader}>Category Name</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>No. of Bookings</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>No. of Hostings</Text>
              </View>
            </View>

            {DataArr.TrendingCategories &&
              DataArr.TrendingCategories.map((item) => {
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
                      <Text style={styles.tableCell}>{item.bookingScore}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.hostingScore}</Text>
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
            ~Events Trendings Report~
          </Text>
          <Image
            style={styles.subImage}
            src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
          />
          <Text style={styles.title}>Most Popular Tags</Text>
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
                <Text style={styles.tableCellHeader}>Category Name</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>No. of Bookings</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>No. of Hostings</Text>
              </View>
            </View>

            {DataArr.TrendingTags &&
              DataArr.TrendingTags.map((item, i = 0) => {
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
                      <Text style={styles.tableCell}>{item.bookingScore}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.hostingScore}</Text>
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
            ~Events Trendings Report~
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
            Total Categories:{" "}
            {DataArr.TrendingCategories && DataArr.TrendingCategories.length}
          </Text>
          <Text style={styles.itemTopic}>
            Top Category:{" "}
            {DataArr.TrendingCategory && DataArr.TrendingCategory[0].name}
          </Text>
          <Text style={styles.text}>
            Category Name:{" "}
            {DataArr.TrendingCategory && DataArr.TrendingCategory[0].name}
          </Text>
          <Text style={styles.text}>
            Bookings:
            {DataArr.TrendingCategory &&
              DataArr.TrendingCategory[0].bookingScore}
          </Text>
          <Text style={styles.text}>
            Events :
            {DataArr.TrendingCategory &&
              DataArr.TrendingCategory[0].hostingScore}
          </Text>

          <Text style={styles.itemTopic}>
            Total Tags: {DataArr.TrendingTags && DataArr.TrendingTags.length}
          </Text>
          <Text style={styles.itemTopic}>
            Top Trending Tag:{" "}
            {DataArr.TrendingTag && DataArr.TrendingTag[0].name}
          </Text>
          <Text style={styles.text}>
            Tag Name: {DataArr.TrendingTag && DataArr.TrendingTag[0].name}
          </Text>
          <Text style={styles.text}>
            Bookings:
            {DataArr.TrendingTag && DataArr.TrendingTag[0].bookingScore}
          </Text>
          <Text style={styles.text}>
            Events :{DataArr.TrendingTag && DataArr.TrendingTag[0].hostingScore}
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
