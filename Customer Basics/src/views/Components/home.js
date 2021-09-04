import React, { Component } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import Navbar2 from "./NabBar";
import Slide from "./slider";
import styled from "styled-components";

import swal from "sweetalert2";
import config from "../../configure";
import "./css/main.css";
import "./css/util.css";
import {
  Button,
  Badge,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

import Card from "./Event/Card16";

//card component

let sample = {
  success: true,
  data: [
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
      totBookings: 5,
      payToPlatform: 6.300000000000001,
      totRevenue: 126,
      payToHost: 50,
      rates: [
        {
          _id: "60fff76b0f91e94650d6a1fd",
        },
      ],
      createdAt: "2021-07-26T19:38:00.609Z",
      updatedAt: "2021-07-27T17:24:09.257Z",
      __v: 2,
      visits: 1,
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
      rates: [],
      createdAt: "2021-07-26T19:44:08.558Z",
      updatedAt: "2021-07-27T12:52:00.168Z",
      __v: 1,
      visits: 0,
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
      updatedAt: "2021-07-27T12:51:54.542Z",
      __v: 1,
      visits: 0,
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
      updatedAt: "2021-07-27T12:51:48.601Z",
      __v: 1,
      visits: 0,
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
      visits: 12,
      rates: [],
      createdAt: "2021-07-27T17:20:17.413Z",
      updatedAt: "2021-07-27T17:24:18.635Z",
      __v: 0,
    },
  ],
};

let sample2 = {
  data: [
    [
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
        totBookings: 5,
        payToPlatform: 6.300000000000001,
        totRevenue: 126,
        payToHost: 50,
        rates: [
          {
            _id: "60fff76b0f91e94650d6a1fd",
          },
        ],
        createdAt: "2021-07-26T19:38:00.609Z",
        updatedAt: "2021-07-27T17:24:09.257Z",
        __v: 2,
        visits: 1,
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
        rates: [],
        createdAt: "2021-07-26T19:44:08.558Z",
        updatedAt: "2021-07-27T12:52:00.168Z",
        __v: 1,
        visits: 0,
      },
    ],
  ],
};

const Container = styled.div`
  padding: 30px;
  
  position: center
  padding-bottom: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 20px;
  grid-auto-rows: 100px;
  grid-template-rows: 300px 300px 300px;
  & > div {
    grid-column: span 2;
    
  
    }
  }
  @media screen and (max-width: 200px) {
    grid-template-columns: 1fr;
    grid-gap: 50px;
    padding: 20px;
    & > div {
      grid-column: span 2 !important;
    }
  }
`;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.TopEventList = this.TopEventList.bind(this);

    this.LocationEventList = this.LocationEventList.bind(this);

    this.PopularEventList = this.PopularEventList.bind(this);

    this.ForyouEventList = this.ForyouEventList.bind(this);

    this.getTopEntries = this.getTopEntries.bind(this);

    this.getLocationEntries = this.getLocationEntries.bind(this);

    this.getPopularEntries = this.getPopularEntries.bind(this);

    this.getForYouEntries = this.getForYouEntries.bind(this);

    this.state = {
      topEvents: [],
      locationEvents: [],
      // popularEvents: [],
      forYouEvents: [],
    };
  }

  onForgotPassword = (e) => {
    return null;
  };

  componentDidMount() {
    this.doInits();
  }

  doInits() {
    // this.getPopularEntries();

    if (localStorage.getItem("username")) {
      this.getForYouEntries();
    }

    this.getLocationEntries();
    this.getTopEntries();
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  getLocationEntries() {
    let key = "Western Province";

    axios
      .get(`http://${config.host}:${config.port}/event/get-province/` + key)
      .then((res) => {
        this.setState({
          locationEvents: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getPopularEntries() {
    axios
      .get(`http://${config.host}:${config.port}/event/trending`)
      .then((res) => {
        this.setState({
          popularEvents: res.data.data,
        });

        console.log("popular data Format ", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getForYouEntries() {
    if (localStorage.getItem("id")) {
      let id = localStorage.getItem("id");
      axios
        .get(`http://${config.host}:${config.port}/event/foryou/` + id)
        .then((res) => {
          this.setState({
            forYouEvents: res.data.data[0],
          });

          console.log("samaple format", sample2.data[0]);
          console.log("available format ", res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getTopEntries() {
    axios
      .get(`http://${config.host}:${config.port}/event/topevents`)
      .then((res) => {
        this.setState({
          topEvents: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  TopEventList() {
    if (this.state.topEvents.data) {
      return this.state.topEvents.data.map((entryCurrent) => {
        return (
          <Card
            eventId={entryCurrent._id}
            // event={}
            title={entryCurrent.name}
            // subtitle={entryCurrent.description}
            subtitle={entryCurrent.time}
            iconName="fas fa-heart"
            btnIcon="fas fa-arrow-right"
            bgPhoto={entryCurrent.img}
            secondTitle={entryCurrent.date.substring(0, 10)}
            totalReviews={30}
            ratingAverage={4.5}
            category={entryCurrent.category}
          />

          // <Card

          //     key={entryCurrent._id}

          //     event={entryCurrent}
          // />
        );
      });
    }
  }

  LocationEventList() {
    if (this.state.locationEvents.data) {
      return this.state.locationEvents.data.map((entryCurrent) => {
        return (
          <Card
            eventId={entryCurrent._id}
            // event={}
            title={entryCurrent.name}
            // subtitle={entryCurrent.description}
            subtitle={entryCurrent.time}
            iconName="fas fa-heart"
            btnIcon="fas fa-arrow-right"
            bgPhoto={entryCurrent.img}
            secondTitle={entryCurrent.date.substring(0, 10)}
            totalReviews={30}
            ratingAverage={4.5}
            category={entryCurrent.category}
          />

          // <Card

          //     key={entryCurrent._id}

          //     event={entryCurrent}
          // />
        );
      });
    }
  }

  PopularEventList() {
    if (this.state.popularEvents) {
      return this.state.popularEvents.map((entryCurrent) => {
        return (
          <Card
            eventId={entryCurrent._id}
            // event={}
            title={entryCurrent.name}
            // subtitle={entryCurrent.description}
            subtitle={entryCurrent.time}
            iconName="fas fa-heart"
            btnIcon="fas fa-arrow-right"
            bgPhoto={entryCurrent.img}
            secondTitle={entryCurrent.date.substring(0, 10)}
            totalReviews={30}
            ratingAverage={4.5}
            category={entryCurrent.category}
          />

          // <Card

          //     key={entryCurrent._id}

          //     event={entryCurrent}
          // />
        );
      });
    }
  }

  ForyouEventList() {
    if (this.state.forYouEvents) {
      return this.state.forYouEvents.map((entryCurrent) => {
        return (
          <Card
            eventId={entryCurrent._id}
            // event={}
            title={entryCurrent.name}
            // subtitle={entryCurrent.description}
            subtitle={entryCurrent.time}
            iconName="fas fa-heart"
            btnIcon="fas fa-arrow-right"
            bgPhoto={entryCurrent.img}
            secondTitle={entryCurrent.date.substring(0, 10)}
            totalReviews={30}
            ratingAverage={4.5}
            category={entryCurrent.category}
          />

          // <Card

          //     key={entryCurrent._id}

          //     event={entryCurrent}
          // />
        );
      });
    }
  }

  //handle sign in

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <Navbar2></Navbar2> */}
        <Navbar />
        <Slide redraw />
        <div style={{ marginTop: "100px", padding: "30px" }}>
          <Row style={{ width: "100%" }}>
            <div style={{ padding: "10px" }}>
              <h1
                style={{
                  fontSize: "9rem",
                  color: "#E1BEE7",
                  marginTop: "20px",
                  marginBottom: "-40px",

                  fontFamily: "Montserrat",
                  width: "1000px",
                  lineHeight: "0.75",
                }}
              >
                Hot Selling Events
              </h1>
              <Container style={{ width: "2000px", height: "500px" }}>
                {" "}
                {this.TopEventList()}
              </Container>
            </div>
          </Row>
          {localStorage.getItem("username") && (
            <Row style={{ width: "100%" }}>
              <div style={{ padding: "10px" }}>
                <h1
                  style={{
                    fontSize: "9rem",
                    color: "#F06292",
                    marginTop: "20px",
                    marginBottom: "-40px",

                    fontFamily: "Montserrat",
                    width: "1000px",
                    lineHeight: "0.75",
                  }}
                >
                  Events You May Like
                </h1>
                <Container style={{ width: "2000px", height: "500px" }}>
                  {" "}
                  {this.ForyouEventList()}
                </Container>
              </div>
            </Row>
          )}
          {/* <Row style={{ width: "100%" }}>
            <div style={{ padding: "10px" }}>
              <h1
                style={{
                  fontSize: "9rem",
                  color: "#FF8A65",
                  marginTop: "20px",
                  marginBottom: "-40px",

                  fontFamily: "Montserrat",
                  width: "1000px",
                  lineHeight: "0.75",
                }}
              >
                Most Popular Events
              </h1>
              <Container style={{ width: "2000px", height: "500px" }}>
                {" "}
                {this.PopularEventList()}
              </Container>
            </div>
          </Row> */}
          <Row style={{ width: "100%" }}>
            <div style={{ padding: "10px" }}>
              <h1
                style={{
                  fontSize: "9rem",
                  color: "#4FC3F7",
                  marginTop: "20px",
                  marginBottom: "-40px",

                  fontFamily: "Montserrat",
                  width: "1000px",
                  lineHeight: "0.75",
                }}
              >
                Events Near You
              </h1>
              <Container style={{ width: "2000px", height: "500px" }}>
                {" "}
                {this.LocationEventList()}
              </Container>
            </div>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}
