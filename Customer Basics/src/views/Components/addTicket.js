import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import Map from "./map";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { CirclePicker } from "react-color";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
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

//get today date

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

function getToday() {
  let date = new Date();
  console.log("date is ", date.toISOString().substring(0, 10));
  return date.toString().substring(0, 10);
}

let warning = "";

const styles = (theme) => ({
  root: {
    height: "100vh",
    overflow: "scroll",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1570872626485-d8ffea69f463?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)",
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

    this.onChangeName = this.onChangeName.bind(this);

    this.onChangeTicketMaxQty = this.onChangeTicketMaxQty.bind(this);
    this.onChangeTicketPrice = this.onChangeTicketPrice.bind(this);
    this.onChangeTicketQty = this.onChangeTicketQty.bind(this);

    this.onChangeTicketColor = this.onChangeTicketColor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.getEvent = this.getEvent.bind(this);

    this.state = {
      ticketName: "",
      ticketColor: "",
      time: "",
      date: "",
      event: "",

      today: "",
      tickets: [],

      address: "",

      tabs: 1,
      payT: 0,
      ticketQty: 0,
      ticketMaxQty: 0,
      ticketPrice: 0,
      ticketComission: 0,
      ticketFinalPrice: 0,
    };
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index,
    });
  };

  onForgotPassword = (e) => {
    return null;
  };

  onChangeTicketQty(e) {
    this.setState({
      ticketQty: e.target.value,
    });
  }

  ChangetoMutiOption() {
    this.setState({
      multiOption: true,
    });
  }

  onChangeTicketColor = (color) => {
    this.setState({ ticketColor: color.hex });
  };

  onChangeTicketPrice(e) {
    this.setState({
      ticketPrice: e.target.value,
    });
  }
  onChangeTicketMaxQty(e) {
    this.setState({
      ticketMaxQty: e.target.value,
    });
  }

  setTicketCommission() {
    if (this.state.tabs == 1) {
      let budget = this.state.ticketQty * this.state.ticketPrice;
      if (budget < 1000) {
        this.setState({
          ticketComission: 0.1,
        });
      }
      if (budget < 50000) {
        this.setState({
          ticketComission: 0.05,
        });
      } else {
        this.setState({
          ticketComission: 0.01,
        });
      }
    } else {
      this.setState({
        ticketComission: 0.0,
      });
    }
  }

  setFinalTicketPrice(value) {
    if (this.state.tabs == 1) {
      if (value == 1) {
        var price = parseFloat(this.state.ticketPrice);

        var commision = this.state.ticketComission;
        var comvalue = price * commision;

        var final = price + comvalue;

        this.setState({
          ticketFinalPrice: final,
        });
      } else {
        this.setState({
          ticketFinalPrice: this.state.ticketPrice,
        });
      }
    } else {
      this.setState({
        ticketFinalPrice: 0,
      });
    }
  }

  onChangeVenue = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    // setAddress(value);
    // setCoordinates(latLng);

    this.setState({
      address: value,
      coordinates: latLng,
    });

    console.log("===============Selected================");
    console.log(this.state.coordinates);
    console.log("====================================");
  };

  onChangeAddress(value) {
    this.setState({
      address: value,
    });
    console.log("===============address================");
    console.log("value");
    console.log("====================================");
  }

  onChangeTag(e) {
    this.setState({
      tag: e.target.value,
    });
    console.log("===============tag================");
    console.log(e.target.value);
    console.log("====================================");
  }

  onSubmitTag() {
    console.log("===============current tags================");
    console.log(this.state.tags);
    console.log("====================================");
    if (this.state.tag == "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "This tag is empty!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      if (this.state.tags.includes(this.state.tag.toLowerCase())) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "This tag is already added!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.state.tags.push(this.state.tag.toLowerCase());
        this.setState({
          tags: this.state.tags,
        });

        console.log("===============new tags================");
        console.log(this.state.tags);
        console.log("====================================");
      }
    }
  }

  componentDidMount() {
    this.validateUser();

    this.getEvent();

    this.setState({
      today: getToday(),
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

  getEvent() {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://${config.host}:${config.port}/event/` +
          this.props.match.params.id,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log("Event Response: ", res.data.data);

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
            event: res.data.data,
          });

          console.log("event id", this.state.event);
        }
      })
      .catch((err) => {
        swal({
          title: "Event is unable add tickets",
          text: "Please try again",
          icon: "warning",
          button: true,
          // dangerMode: true,
        });
      });
  }

  TagList() {
    return this.state.tags.map((tag, key) => {
      return (
        <Badge color="info" style={{ margin: "10px" }}>
          {tag}{" "}
          <Badge
            color="danger"
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.removerFromTags(key);
            }}
          >
            X
          </Badge>
        </Badge>

        // <Card

        //     key={entryCurrent._id}

        //     event={entryCurrent}
        // />
      );
    });
  }

  removerFromTags(key) {
    this.state.tags.splice(key, 1);
    this.setState({
      tags: this.state.tags,
    });
  }

  onChangeName(e) {
    this.setState({
      ticketName: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e,
    });
  }

  onChangeTime(e) {
    this.setState({
      time: e.target.value,
    });
  }

  onChangeDurationType(e) {
    this.setState({
      dutationType: e.target.value,
    });
  }

  onChangeCategory(e) {
    console.log("==============       category   ======================");
    console.log(e.target.value);
    console.log("====================================");

    this.setState({
      category: e.target.value,
    });
  }

  onChangeDesc(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeContact(e) {
    this.setState({
      contact: e.target.value,
    });
  }

  onChangeImg(e) {
    this.setState({
      img: e.target.files[0],
    });

    console.log("image is", e.target.files[0]);
  }

  onChangeOrd(e) {
    this.setState({
      organizer: e.target.value,
    });
  }

  //handle sign in

  onSubmit() {
    let Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: this.state.uploadPercentage,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const Entry = {
      ticketType: this.state.tabs,
      ticketName: this.state.ticketName,
      ticketNamedPrice: this.state.ticketPrice,
      ticketAvailableQty: this.state.ticketQty,
      ticketMaxPerQty: this.state.ticketMaxQty,
      payType: this.state.payT,
      eventId: this.state.event._id,
      ticketColor: this.state.ticketColor,
    };

    console.log("=============entry is ===============");
    console.log(Entry);
    console.log("====================================");

    let token = localStorage.getItem("token");
    const response = axios
      .post(`http://${config.host}:${config.port}/ticket/add`, Entry, {
        headers: {
          token: token,
        },
        onUploadProgress: (ProgressEvent) => {
          this.state.uploadPercentage =
            100 -
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            );

          console.log("percentage inside ", this.state.uploadPercentage);

          Toast.fire({
            icon: "info",
            title: "Saving ticket details...",
            text: "Please wait a moment",
          });

          setTimeout(() => (this.state.uploadPercentage = 0), 1000);
        },
      })
      .then((res) => {
        const warning = res.data.warn;

        if (warning !== null && warning !== undefined) {
          console.log("message is", warning);

          Swal.fire({
            position: "center",
            icon: "info",
            title: "Please Try Again",
            text: warning,
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully saved the ticket!",
            showConfirmButton: false,
            timer: 3000,
          });

          window.location =
            "http://localhost:3000/host/tickets/" + this.state.event._id;
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error Occured.Please try again",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  }

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
              <Grid item xs={false} sm={4} md={7} className={classes.image} />

              {/* ticket */}

              <Grid
                item
                id="tickets"
                xs={12}
                sm={8}
                md={5}
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
                          Add Ticket
                        </span>
                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "2rem", color: "#AB47BC" }}
                        >
                          Tickets Details
                        </span>
                        <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter Ticket Name"
                          id="ticketName"
                        >
                          <span
                            className="login100-form-title p-b-30"
                            style={{
                              fontSize: "1.5rem",
                              marginTop: "20px",
                            }}
                          >
                            Ticket Name
                          </span>
                          {this.state.ticketName.length > 35 && (
                            <Badge color="warning" pill>
                              You Reached Maximum Characters allowed which is 36
                            </Badge>
                          )}
                          <input
                            className="input100"
                            type="text"
                            name="name"
                            placeholder={"EX: First Class"}
                            required
                            maxLength={36}
                            onChange={this.onChangeName}
                            value={this.state.ticketName}
                          />

                          <span className="focus-input100"></span>
                        </div>

                        <span
                          className="login100-form-title p-b-30"
                          style={{
                            fontSize: "1.5rem",
                            marginTop: "20px",
                          }}
                        >
                          Pick a Ticket Color
                        </span>
                        <CirclePicker
                          color={this.state.ticketColor}
                          colors={Colors}
                          onChangeComplete={this.onChangeTicketColor}
                        />
                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "1.5rem", marginTop: "2rem" }}
                        >
                          Ticket Type
                        </span>
                        {/*  */}
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
                                  aria-selected={this.state.tabs === 1}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.tabs === 1,
                                  })}
                                  onClick={(e) => this.toggleNavs(e, "tabs", 1)}
                                  href="#pablo"
                                  role="tab"
                                >
                                  <Icon
                                    icon={coinIcon}
                                    width="30"
                                    height="30"
                                  />
                                  Paid
                                </NavLink>
                              </NavItem>
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
                                  <Icon icon={medalF} width="30" height="30" />
                                  Free
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </div>

                          <TabContent activeTab={"tabs" + this.state.tabs}>
                            <TabPane tabId="tabs1">
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
                                  Ticket Price ($)
                                </span>
                                <input
                                  className="input100"
                                  type="text"
                                  name="username"
                                  placeholder={"EX: 10"}
                                  required
                                  onChange={this.onChangeTicketPrice}
                                  value={this.state.ticketPrice}
                                />
                                <span className="focus-input100"></span>
                              </div>
                            </TabPane>
                            <TabPane tabId="tabs2">
                              <p className="description"></p>
                            </TabPane>
                          </TabContent>
                        </>
                        <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter Quantity"
                        >
                          <span
                            className="login100-form-title p-b-30"
                            style={{ fontSize: "1.5rem", marginTop: "20px" }}
                          >
                            Available Quantity
                          </span>
                          <input
                            className="input100"
                            type="number"
                            name="username"
                            placeholder={"EX: 200"}
                            required
                            onChange={this.onChangeTicketQty}
                            value={this.state.ticketQty}
                          />
                          <span className="focus-input100"></span>
                        </div>
                        <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter Quantity"
                        >
                          <span
                            className="login100-form-title p-b-30"
                            style={{ fontSize: "1.5rem", marginTop: "20px" }}
                          >
                            Maximum Tickets Per Booking
                          </span>
                          <input
                            className="input100"
                            type="number"
                            name="username"
                            placeholder={"EX: 10"}
                            required
                            onChange={this.onChangeTicketMaxQty}
                            value={this.state.ticketMaxQty}
                          />
                          <span className="focus-input100"></span>
                        </div>
                        {/*  */}
                        <center>
                          <div>
                            <Button
                              style={{ width: "200px" }}
                              className="mr-4"
                              color="primary"
                              href="#host-event"
                              onClick={(e) => {
                                e.preventDefault();

                                let push = true;

                                if (this.state.tabs == 1) {
                                  if (this.state.ticketPrice == 0) {
                                    Swal.fire({
                                      position: "center",
                                      icon: "warning",
                                      title: "Please Eneter a event price!",
                                      showConfirmButton: false,
                                      timer: 1500,
                                    });

                                    push = false;
                                  }
                                }
                                if (this.state.ticketQty == 0) {
                                  Swal.fire({
                                    position: "center",
                                    icon: "warning",
                                    title:
                                      "Please Eneter Available ticket Quantity!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                  });

                                  push = false;
                                }

                                if (this.state.ticketName == "") {
                                  Swal.fire({
                                    position: "center",
                                    icon: "warning",
                                    title: "Ticket name can not be empty!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                  });

                                  push = false;
                                }

                                if (this.state.ticketColor == "") {
                                  Swal.fire({
                                    position: "center",
                                    icon: "warning",
                                    title: "Please choose a ticket Color!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                  });

                                  push = false;
                                }

                                if (push) {
                                  this.setTicketCommission();

                                  var basicGrid =
                                    document.getElementById("tickets");
                                  var paymetGrid =
                                    document.getElementById("paymentGrid");
                                  basicGrid.style.display = "none";
                                  paymetGrid.style.display = "block";
                                }
                              }}
                              size="lg"
                            >
                              Next
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

              {/* who pays */}

              <Grid
                item
                id="paymentGrid"
                xs={12}
                sm={8}
                md={5}
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
                          Add Ticket
                        </span>

                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "2rem", color: "#AB47BC" }}
                        >
                          Payment Method
                        </span>

                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "1.5rem" }}
                        >
                          Commission Payment Party
                        </span>

                        {/*  */}

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
                                  aria-selected={this.state.payT === 1}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.payT === 1,
                                  })}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.setFinalTicketPrice(1);
                                    this.toggleNavs(e, "payT", 1);
                                  }}
                                  href="#pablo"
                                  role="tab"
                                >
                                  <Icon
                                    icon={usersIcon}
                                    width="30"
                                    height="30"
                                  />
                                  Customer
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  aria-selected={this.state.payT === 2}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: this.state.payT === 2,
                                  })}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.setFinalTicketPrice(2);
                                    this.toggleNavs(e, "payT", 2);
                                  }}
                                  href="#pablo"
                                  role="tab"
                                >
                                  <Icon icon={crownF} width="30" height="30" />
                                  Event Host ( You )
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </div>

                          <Card className="shadow">
                            <CardBody>
                              {this.state.payT == 0 &&
                                "Please select the payment party"}
                              <TabContent activeTab={"tabs" + this.state.payT}>
                                <TabPane tabId="tabs1">
                                  <div
                                    className="wrap-input100 validate-input m-t-5 m-b-35"
                                    data-validate="Enter Quantity"
                                  >
                                    <span
                                      className="login100-form-title p-b-30"
                                      style={{
                                        fontSize: "1.5rem",
                                        marginTop: "20px",
                                      }}
                                    >
                                      Ticket Price for Customer
                                    </span>

                                    <span
                                      className="login100-form-title p-b-30"
                                      style={{
                                        fontSize: "1.8rem",
                                        marginTop: "20px",
                                        color: "#AB47BC",
                                      }}
                                    >
                                      {this.state.ticketFinalPrice} $
                                    </span>

                                    <span className="focus-input100"></span>
                                  </div>
                                  <p className="description">
                                    The Comission is{" "}
                                    <b> {this.state.ticketComission * 100} </b>
                                    {" % "}
                                  </p>
                                  <p className="description">
                                    You don not pay any commission{" "}
                                  </p>
                                </TabPane>
                                <TabPane tabId="tabs2">
                                  <div
                                    className="wrap-input100 validate-input m-t-5 m-b-35"
                                    data-validate="Enter Quantity"
                                  >
                                    <span
                                      className="login100-form-title p-b-30"
                                      style={{
                                        fontSize: "1.5rem",
                                        marginTop: "20px",
                                      }}
                                    >
                                      Ticket Price for Customer
                                    </span>

                                    <span
                                      className="login100-form-title p-b-30"
                                      style={{
                                        fontSize: "1.8rem",
                                        marginTop: "20px",
                                        color: "#AB47BC",
                                      }}
                                    >
                                      {this.state.ticketFinalPrice} $
                                    </span>

                                    <span className="focus-input100"></span>
                                  </div>
                                  <p className="description">
                                    The Comission is{" "}
                                    <b> {this.state.ticketComission * 100} </b>
                                    {" % "}
                                  </p>
                                  <p className="description">
                                    You pay{" "}
                                    <b>
                                      {this.state.ticketComission *
                                        this.state.ticketPrice}{" "}
                                      $
                                    </b>{" "}
                                    per every ticket!
                                  </p>
                                </TabPane>
                              </TabContent>
                            </CardBody>
                          </Card>
                        </>

                        {/*  */}

                        <center>
                          <Button
                            style={{ width: "200px", marginBottom: "30px" }}
                            className="mr-4"
                            color="primary"
                            href="#host-event"
                            onClick={() => {
                              var basicGrid =
                                document.getElementById("paymentGrid");
                              var ticketGrid =
                                document.getElementById("tickets");
                              basicGrid.style.display = "none";
                              ticketGrid.style.display = "block";
                            }}
                            size="lg"
                          >
                            Back
                          </Button>
                        </center>

                        <div className="container-login100-form-btn">
                          <button
                            className="btn btn-success"
                            style={{
                              paddingLeft: "100px",
                              paddingRight: "100px",
                              paddingTop: "20px",
                              paddingBottom: "20px",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              this.onSubmit(e);
                            }}
                          >
                            Save Ticket
                          </button>
                        </div>
                        {/* 
                        <ul className="login-more p-t-50">
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
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(addEvent);
