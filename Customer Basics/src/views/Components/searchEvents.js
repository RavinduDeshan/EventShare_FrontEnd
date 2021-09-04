import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import CardBooking from "./BookCard";
import Map from "./map";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { CirclePicker } from "react-color";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { PayPalButton } from "react-paypal-button-v2";
import classnames from "classnames";
import coinIcon from "@iconify-icons/jam/coin";
import medalF from "@iconify-icons/jam/medal-f";
import usersIcon from "@iconify-icons/jam/users";
import crownF from "@iconify-icons/jam/crown-f";
import mapMarker from "@iconify-icons/jam/map-marker";
import { Icon } from "@iconify/react";
import uploadIcon from "@iconify-icons/jam/upload";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { Grid } from "@material-ui/core";
import config from "../../configure";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import filterF from "@iconify-icons/jam/filter-f";

import searchIcon from "@iconify-icons/jam/search";

import {
  Button,
  Badge,
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap";

import "./css/main.css";
import "./css/util.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import CardEvent from "./Event/Card15";
import styled from "styled-components";

//get today date
const dataArray = {
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
      updatedAt: "2021-07-27T12:09:15.328Z",
      __v: 2,
      visits: 0,
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
  ],
};

const Container = styled.div`
  padding: 50px;
  padding-left:130px;
  
  position: center
  padding-bottom: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 50px;
  grid-auto-rows: 100px;
  grid-template-rows: 300px 300px 300px;
  & > div {
    grid-column: span 2;
    
  
    }
  }
  @media screen and (max-width: 1900px) {
    grid-template-columns: 1fr;
    grid-gap: 50px;
    padding: 20px;
    & > div {
      grid-column: span 2 !important;
    }
  }
`;
const Colors = [
  "#4A148C",
  "#6A1B9A",

  "#8E24AA",
  "#1A237E",
  "#283593",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",

  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#E91E63",
  "#607d8b",
];

let warning = "";

const styles = (theme) => ({
  root: {
    height: "100vh",
    overflow: "scroll",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "1rem",
  },
  submit: {
    margin: "1rem",
  },
});

class addEvent extends Component {
  constructor(props) {
    super(props);

    // this.onSubmit = this.onSubmit.bind(this);

    this.getEvents = this.getEvents.bind(this);
    this.getEventsInitial = this.getEventsInitial.bind(this);

    this.onChangeKey = this.onChangeKey.bind(this);

    this.onChangePanel = this.onChangePanel.bind(this);

    this.state = {
      key: "",
      events: dataArray,
      backend: "/search-all/",
      tabs: 1,
    };
  }

  componentDidMount() {
    // this.validateUser();

    this.getEventsInitial();
  }

  EventList() {
    return this.state.events.data.map((entryCurrent) => {
      return (
        <CardEvent
          key={entryCurrent._id}
          id={entryCurrent._id}
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

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index,
    });
  };

  getEventsInitial() {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:443/event/`)
      .then((res) => {
        console.log("Event Response: ", res.data);

        warning = res.data.warn;

        if (warning !== null && warning !== undefined) {
          console.log("message is", warning);

          swal({
            title: "Please Try Again",
            text: warning,
            icon: "warning",
            button: true,
            // dangerMode: true,
          }).then((result) => {
            // window.location = "http://localhost:3001/";
            console.log("====================================");
            console.log("Error on  event  data");
            console.log("====================================");
          });
        } else {
          this.setState({
            events: res.data,
          });

          console.log("event data humpty", this.state.events);
        }
      })
      .catch((err) => {
        swal({
          title: "Unable to load Events",
          text: "Please try again",
          icon: "warning",
          button: true,
          // dangerMode: true,
        });
      });
  }

  getEvents() {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:443/event` + this.state.backend + this.state.key)
      .then((res) => {
        console.log("Event Response: ", res.data);

        warning = res.data.warn;

        if (warning !== null && warning !== undefined) {
          console.log("message is", warning);

          swal({
            title: "Please Try Again",
            text: warning,
            icon: "warning",
            button: true,
            // dangerMode: true,
          }).then((result) => {
            // window.location = "http://localhost:3001/";
            console.log("====================================");
            console.log("Error on getting event ticket data");
            console.log("====================================");
          });
        } else {
          this.setState({
            events: res.data,
          });

          console.log("event id", this.state.event);
        }
      })
      .catch((err) => {
        swal({
          title: "Unable to load Events",
          text: "Please try again",
          icon: "warning",
          button: true,
          // dangerMode: true,
        });
      });
  }

  //session validation
  validateUser() {
    const token = localStorage.getItem("token");
    axios
      .get(`http://${config.host}:${config.port}/user/session-validate`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log("Validation Response: ", res.data);
      })
      .catch((err) => {
        if (token === "null") {
          console.log("Token is null Box called");

          swal({
            title: "Please Log In",
            text: "You have to Log-In First!",
            icon: "error",
            button: "ok",
          });

          this.props.history.push("/login");
        } else {
          console.log("the token value is :", token);

          Swal.fire({
            position: "bottom-end",
            icon: "error",
            title: "Session Has Expired",
            html:
              "<h4>Last Session Details</h4><br/><b>User ID :</b> " +
              localStorage.getItem("id") +
              "<br/>" +
              "<b>User Name :</b> " +
              localStorage.getItem("username") +
              "<br/><br/>",
            showConfirmButton: false,
            timer: 4000,
          });

          this.props.history.push("/login");
        }
      });
  }

  onChangeKey(e) {
    this.setState({
      key: e.target.value,
    });
  }

  onChangePanel(e) {
    if (e == 1) {
      this.setState({
        backend: "/search-all/",
      });
    }

    if (e == 2) {
      this.setState({
        backend: "/search-name/",
      });
    }

    if (e == 3) {
      this.setState({
        backend: "/search-category/",
      });
    }

    if (e == 4) {
      this.setState({
        backend: "/search-venue/",
      });
    }
  }

  //handle sign in

  // onSubmit() {
  //   let Toast = Swal.mixin({
  //     toast: true,
  //     position: "center",
  //     showConfirmButton: false,
  //     timer: this.state.uploadPercentage,
  //     timerProgressBar: true,
  //     onOpen: (toast) => {
  //       toast.addEventListener("mouseenter", Swal.stopTimer);
  //       toast.addEventListener("mouseleave", Swal.resumeTimer);
  //     },
  //     onBeforeOpen: () => {
  //       Swal.showLoading();
  //     },
  //   });

  //   console.log("=============entry is ===============");
  //   console.log(Entry);
  //   console.log("====================================");

  //   let token = localStorage.getItem("token");
  //   const response = axios
  //     .post(`http://${config.host}:${config.port}/booking/add`, key, {
  //       headers: {
  //         token: token,
  //       },
  //       onUploadProgress: (ProgressEvent) => {
  //         this.state.uploadPercentage =
  //           100 -
  //           parseInt(
  //             Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
  //           );

  //         console.log("percentage inside ", this.state.uploadPercentage);

  //         Toast.fire({
  //           icon: "info",
  //           title: "Saving ticket details...",
  //           text: "Please wait a moment",
  //         });

  //         setTimeout(() => (this.state.uploadPercentage = 0), 1000);
  //       },
  //     })
  //     .then((res) => {
  //       const warning = res.data.warn;

  //       if (warning !== null && warning !== undefined) {
  //         console.log("message is", warning);

  //         Swal.fire({
  //           position: "center",
  //           icon: "info",
  //           title: "Please Try Again",
  //           text: warning,
  //           showConfirmButton: false,
  //           timer: 3000,
  //         });
  //       } else {
  //         Swal.fire({
  //           position: "center",
  //           icon: "success",
  //           title: "Successfully saved the ticket!",
  //           showConfirmButton: false,
  //           timer: 3000,
  //         });

  //         window.location =
  //           "http://localhost:3000/host/tickets/" + this.state.event._id;
  //       }
  //     })
  //     .catch((err) => {
  //       Swal.fire({
  //         position: "center",
  //         icon: "error",
  //         title: "Error Occured.Please try again",
  //         showConfirmButton: false,
  //         timer: 3000,
  //       });
  //     });
  // }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navbar />
        <div id="host-event">
          <form
            onSubmit={this.onUpload}
            className="login100-form validate-form"
          >
            <Grid container component="main" className={classes.root}>
              <Grid
                item
                id="searchGrid"
                xs={3}
                sm={3}
                md={3}
                component={Paper}
                elevation={6}
                square
                style={{ display: "block" }}
              >
                <div className="limiter">
                  <div className="container-login100">
                    <center>
                      <div className="wrap-login100 p-t-85 p-b-20">
                        <span className="login100-form-title p-b-70">
                          Search Events
                        </span>
                        <span
                          className="login100-form-title p-b-30"
                          style={{
                            fontSize: "2rem",
                            color: "#AB47BC",
                            marginBottom: "-20px",
                          }}
                        >
                          Search All
                          <div
                            className="wrap-input100 validate-input m-t-5 m-b-35"
                            data-validate="Enter Ticket Price"
                          >
                            <span
                              className="login100-form-title p-b-30"
                              style={{
                                fontSize: "1.5rem",
                                marginTop: "20px",
                              }}
                            ></span>
                            <input
                              className="input100"
                              type="text"
                              name="username"
                              placeholder={"EX: music"}
                              required
                              onChange={this.onChangeKey}
                              value={this.state.key}
                            />
                            <span className="focus-input100"></span>
                          </div>
                        </span>
                        <div>
                          <Button
                            style={{
                              width: "200px",
                              height: "60px",
                              borderRadius: "100px",
                              fontSize: "1.5rem",
                            }}
                            className="mr-4"
                            color="primary"
                            href="#host-event"
                            onClick={(e) => {
                              e.preventDefault();
                              this.onChangePanel(1);
                              this.getEvents();
                            }}
                          >
                            <Icon icon={searchIcon} /> Search
                          </Button>
                        </div>
                        <div>
                          <Button
                            style={{
                              width: "150px",
                              borderRadius: "100px",
                              marginTop: "70px",
                            }}
                            className="mr-4"
                            color="warning"
                            href="#host-event"
                            onClick={(e) => {
                              e.preventDefault();

                              var Grid1 =
                                document.getElementById("filtersGrid");
                              var Grid2 = document.getElementById("searchGrid");
                              Grid1.style.display = "block";
                              Grid2.style.display = "none";
                            }}
                          >
                            <Icon icon={filterF} />
                            Use Filters
                          </Button>
                        </div>

                        {/*  */}

                        {/* <ul className="login-more p-t-50">
                          <li>
                            <span className="txt1">Changed your mind?</span>

                            <a href="#" className="txt2">
                              <Link to={"/home"}> Cancel</Link>
                            </a>
                          </li>
                        </ul> */}
                      </div>
                    </center>
                  </div>
                </div>
              </Grid>

              <Grid
                item
                id="filtersGrid"
                xs={3}
                sm={3}
                md={3}
                component={Paper}
                elevation={6}
                square
                style={{ display: "none" }}
              >
                <div className="limiter">
                  <div className="container-login100">
                    <center>
                      <div className="wrap-login100 p-t-85 p-b-20">
                        <span className="login100-form-title p-b-70">
                          Search Events
                        </span>
                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "2rem", color: "#AB47BC" }}
                        >
                          Filters
                        </span>
                        <div>
                          {/* <Button
                            style={{ width: "200px", borderRadius: "100px" }}
                            className="mr-4"
                            color="primary"
                            href="#host-event"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            Use Filters
                          </Button> */}
                        </div>

                        <>
                          <div className="nav-wrapper">
                            <Nav
                              className="nav-fill flex-column flex-md-row"
                              id="tabs-icons-text"
                              pills
                              role="tablist"
                            >
                              <NavItem>
                                <NavLink
                                  style={{ borderRadius: "3rem" }}
                                  aria-selected={this.state.tabs === 2}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.tabs === 2,
                                  })}
                                  onClick={(e) => this.toggleNavs(e, "tabs", 2)}
                                  href="#pablo"
                                  role="tab"
                                >
                                  {/* <Icon
                                    icon={coinIcon}
                                    width="30"
                                    height="30"
                                  /> */}
                                  By Event Name
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  style={{ borderRadius: "3rem" }}
                                  aria-selected={this.state.tabs === 3}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.tabs === 3,
                                  })}
                                  onClick={(e) => this.toggleNavs(e, "tabs", 3)}
                                  href="#pablo"
                                  role="tab"
                                >
                                  {/* <Icon icon={medalF} width="30" height="30" /> */}
                                  By Category
                                </NavLink>
                              </NavItem>
                            </Nav>

                            <Nav
                              className="nav-fill flex-column flex-md-row"
                              id="tabs-icons-text"
                              pills
                              role="tablist"
                              style={{ marginTop: "20px" }}
                            >
                              <NavItem>
                                <NavLink
                                  style={{ borderRadius: "3rem" }}
                                  aria-selected={this.state.tabs === 4}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.tabs === 4,
                                  })}
                                  onClick={(e) => this.toggleNavs(e, "tabs", 4)}
                                  href="#pablo"
                                  role="tab"
                                >
                                  {/* <Icon
                                    icon={coinIcon}
                                    width="30"
                                    height="30"
                                  /> */}
                                  By Event Location
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </div>

                          <TabContent activeTab={"tabs" + this.state.tabs}>
                            <TabPane tabId="tabs2">
                              <div
                                className="wrap-input100 validate-input m-t-5 m-b-35"
                                data-validate="Enter Ticket Price"
                              >
                                <span
                                  className="login100-form-title p-b-30"
                                  style={{
                                    fontSize: "1.5rem",
                                    marginTop: "20px",
                                  }}
                                >
                                  Search Event Name
                                </span>
                                <input
                                  className="input100"
                                  type="text"
                                  name="username"
                                  placeholder={"EX: music"}
                                  required
                                  onChange={this.onChangeKey}
                                  value={this.state.key}
                                />

                                <span className="focus-input100"></span>
                              </div>

                              <div>
                                <Button
                                  style={{
                                    width: "200px",
                                    height: "60px",
                                    borderRadius: "100px",
                                    fontSize: "1.5rem",
                                  }}
                                  className="mr-4"
                                  color="primary"
                                  href="#host-event"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.onChangePanel(2);
                                    this.getEvents();
                                  }}
                                >
                                  <Icon icon={searchIcon} /> Search
                                </Button>
                              </div>
                            </TabPane>

                            <TabPane tabId="tabs3">
                              <div
                                className="wrap-input100 validate-input m-t-5 m-b-35"
                                data-validate="Enter Ticket Price"
                              >
                                <span
                                  className="login100-form-title p-b-30"
                                  style={{
                                    fontSize: "1.5rem",
                                    marginTop: "20px",
                                  }}
                                >
                                  Search Event Category
                                </span>
                                <input
                                  className="input100"
                                  type="text"
                                  name="username"
                                  placeholder={"EX: music"}
                                  required
                                  onChange={this.onChangeKey}
                                  value={this.state.key}
                                />
                                <span className="focus-input100"></span>
                              </div>

                              <div>
                                <Button
                                  style={{
                                    width: "200px",
                                    height: "60px",
                                    borderRadius: "100px",
                                    fontSize: "1.5rem",
                                  }}
                                  className="mr-4"
                                  color="primary"
                                  href="#host-event"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.onChangePanel(3);
                                    this.getEvents();
                                  }}
                                >
                                  <Icon icon={searchIcon} /> Search
                                </Button>
                              </div>
                            </TabPane>

                            <TabPane tabId="tabs4">
                              <div
                                className="wrap-input100 validate-input m-t-5 m-b-35"
                                data-validate="Enter Ticket Price"
                              >
                                <span
                                  className="login100-form-title p-b-30"
                                  style={{
                                    fontSize: "1.5rem",
                                    marginTop: "20px",
                                  }}
                                >
                                  Search Event Venue
                                </span>
                                <input
                                  className="input100"
                                  type="text"
                                  name="username"
                                  placeholder={"EX: music"}
                                  required
                                  onChange={this.onChangeKey}
                                  value={this.state.key}
                                />
                                <span className="focus-input100"></span>
                              </div>

                              <div>
                                <Button
                                  style={{
                                    width: "200px",
                                    height: "60px",
                                    borderRadius: "100px",
                                    fontSize: "1.5rem",
                                  }}
                                  className="mr-4"
                                  color="primary"
                                  href="#host-event"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.onChangePanel(4);
                                    this.getEvents();
                                  }}
                                >
                                  <Icon icon={searchIcon} /> Search
                                </Button>
                              </div>
                            </TabPane>

                            <TabPane tabId="tabs2">
                              <p className="description"></p>
                            </TabPane>
                          </TabContent>
                        </>

                        {/*  */}
                        <center>
                          <div>
                            <Button
                              style={{
                                width: "180px",
                                borderRadius: "100px",
                                marginTop: "70px",
                              }}
                              className="mr-4"
                              color="warning"
                              href="#host-event"
                              onClick={(e) => {
                                e.preventDefault();

                                var Grid1 =
                                  document.getElementById("filtersGrid");
                                var Grid2 =
                                  document.getElementById("searchGrid");
                                Grid2.style.display = "block";
                                Grid1.style.display = "none";
                              }}
                            >
                              <Icon icon={filterF} />
                              Remove Filters
                            </Button>
                          </div>
                        </center>
                        {/* <ul className="login-more p-t-50">
                          <li>
                            <span className="txt1">Changed your mind?</span>

                            <a href="#" className="txt2">
                              <Link to={"/home"}> Cancel</Link>
                            </a>
                          </li>
                        </ul> */}
                      </div>
                    </center>
                  </div>
                </div>
              </Grid>
              <Grid item xs={false} sm={9} md={9}>
                <Container>{this.EventList()}</Container>
              </Grid>

              {/* ticket */}

              {/* who pays */}
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(addEvent);
