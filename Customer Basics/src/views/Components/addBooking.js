import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import CardBooking from "./BookCard";
import CardCoupons from "./couponCard";
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
import { TimerSharp } from "@material-ui/icons";

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

let warning = "";

const styles = (theme) => ({
  root: {
    height: "100vh",
    overflow: "scroll",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1578575436955-ef29da568c6c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
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

    this.onSubmit = this.onSubmit.bind(this);

    this.getTicket = this.getTicket.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.getCoupons = this.getCoupons.bind(this);
    this.getUser = this.getUser.bind(this);

    this.onChangeTicketQty = this.onChangeTicketQty.bind(this);

    this.state = {
      ticketName: "",
      ticketColor: "",
      time: "",
      event: "",
      date: "",
      ticket: "",
      today: "",
      tickets: [],
      coupons: "",
      address: "",
      tabs: 1,
      payT: 0,
      finalPrice: 0,
      discountPoints: 0,
      discountValue: 0,
      ticketFinalePrice: "",
      ticketQty: "",
      ticketPrice: 0,
      ticketComission: 0,
      ticketFinalPrice: "",
      user: "",
    };
  }

  onChangeTicketQty(e) {
    if (e.target.value > this.state.ticket.ticketAvailableQty) {
      Swal.fire({
        position: "center",
        icon: "info",
        title:
          "Only " +
          this.state.ticket.ticketAvailableQty +
          " more tickets left!",
        text: warning,
        showConfirmButton: false,
        timer: 3000,
      });

      this.setState({
        ticketQty: this.state.ticket.ticketAvailableQty,
      });
    } else {
      this.setState({
        ticketQty: e.target.value,
      });
    }
  }

  onForgotPassword = (e) => {
    return null;
  };

  calcFinale() {
    let max = 0;

    if (this.state.ticket.ticketMaxPerQty !== 0) {
      max = this.state.ticket.ticketMaxPerQty;
    } else {
      max = 100;
    }

    if (this.state.ticketQty > max) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Only " + max + " tickets are allowed per one booking",
        text: warning,
        showConfirmButton: false,
        timer: 3000,
      });

      return false;
    } else {
      if (this.state.ticketQty > this.state.ticket.ticketAvailableQty) {
        Swal.fire({
          position: "center",
          icon: "info",
          title:
            "Only " +
            this.state.ticket.ticketAvailableQty +
            " more tickets left!",
          text: warning,
          showConfirmButton: false,
          timer: 3000,
        });

        return false;
      } else {
        console.log("===========finalprice=========");
        console.log(this.state.ticketQty * this.state.ticket.ticketFinalePrice);
        console.log("====================================");

        this.setState({
          finalPrice:
            this.state.ticketQty * this.state.ticket.ticketFinalePrice,
        });

        console.log("===========finalprice=========");
        console.log(this.state.ticketQty * this.state.ticket.ticketFinalePrice);
        console.log("====================================");
        return true;
      }
    }
  }

  componentDidMount() {
    this.validateUser();

    this.getEvent();

    this.getTicket();
    this.getCoupons();
    this.getUser();
  }

  getCoupons() {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://${config.host}:${config.port}/coupons/byEvent/` +
          this.props.match.params.eventId,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log("Coupon Response: ", res.data.data);

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

  getUser() {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://${config.host}:${config.port}/user/` +
          localStorage.getItem("id"),
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log("user Response: ", res.data.User);

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
            user: res.data.User,
          });

          console.log("user points", this.state.user.points);
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

  addCoupon(points, value) {
    if (this.state.user.points < points) {
      swal({
        title: "Insufficient Points",
        text: "You do not have enough point to buy",
        icon: "warning",
        button: true,
        // dangerMode: true,
      });
    } else if (value > this.state.finalPrice) {
      swal({
        title: "Please Try Again!",
        text: "Your order should be greater than the discount price",
        icon: "warning",
        button: true,
        // dangerMode: true,
      });
    } else {
      let fp = this.state.finalPrice;
      this.setState({
        discountPoints: points,
        discountValue: value,
        finalPrice: fp - value,
      });

      var basicGrid = document.getElementById("discountsGrid");
      var paymetGrid = document.getElementById("paymentGrid");
      basicGrid.style.display = "none";
      paymetGrid.style.display = "block";
    }
  }

  getEvent() {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://${config.host}:${config.port}/event/` +
          this.props.match.params.eventId,
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

  getTicket() {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://${config.host}:${config.port}/ticket/` +
          this.props.match.params.id,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log("Ticket Response: ", res.data.data[0]);

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
            ticket: res.data.data[0],
          });

          if (res.data.data[0].ticketAvailableQty <= 0) {
            swal({
              title: "This ticket is sold out!",
              text: warning,
              icon: "warning",
              button: true,
              // dangerMode: true,
            }).then((result) => {
              window.location =
                "http://localhost:3001/event/" + res.data.data[0].eventId;
              console.log("====================================");
              console.log("Error on getting event ticket data");
              console.log("====================================");
            });
          }
          console.log("ticket id", this.state.event);
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
      ticketName: this.state.ticket.ticketName,
      ticketNamedPrice: this.state.ticket.ticketNamedPrice,
      ticketQty: this.state.ticketQty,
      ticketId: this.state.ticket._id,
      payT: this.state.ticket.payType,
      eventId: this.state.event._id,
      userId: localStorage.getItem("id"),
      username: localStorage.getItem("username"),
      payAmount: this.state.finalPrice,
      eventName: this.state.event.name,
      commission: this.state.ticket.commission,
      category: this.state.event.category,
      tags: this.state.event.tags,
    };

    console.log("=============entry is ===============");
    console.log(Entry);
    console.log("====================================");

    let token = localStorage.getItem("token");
    const response = axios
      .post(`http://${config.host}:${config.port}/booking/add`, Entry, {
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
            "http://localhost:3001/event/" + this.state.event._id;
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
                          Book Ticket
                        </span>
                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "2rem", color: "#AB47BC" }}
                        >
                          Event Details
                        </span>

                        <div style={{ padding: "30px" }}>
                          <CardBooking
                            key={this.state.ticket.id}
                            // event={}
                            title={this.state.event.name}
                            // subtitle={entryCurrent.description}
                            subtitle={this.state.event.date + " , "}
                            time={this.state.event.time}
                            iconName="fas fa-heart"
                            btnIcon="fas fa-arrow-right"
                            bgPhoto={this.state.event.img}
                            secondTitle={this.state.ticket.ticketFinalePrice}
                            totalReviews={30}
                            ratingAverage={4.5}
                            colorTitle={this.state.ticket.ticketColor}
                            TicketTitle={this.state.ticket.ticketName}
                          />
                        </div>
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
                            Number of Tickets
                          </span>
                          {this.state.ticketName.length > 35 && (
                            <Badge color="warning" pill>
                              You Reached Maximum Characters allowed which is 36
                            </Badge>
                          )}
                          <input
                            className="input100"
                            type="number"
                            name="name"
                            placeholder={"EX: 2"}
                            required
                            maxLength={4}
                            onChange={this.onChangeTicketQty}
                            value={this.state.ticketQty}
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

                                if (
                                  this.state.ticketQty == "" ||
                                  this.state.ticketQty == 0
                                ) {
                                  Swal.fire({
                                    position: "center",
                                    icon: "info",
                                    title:
                                      "Number of ticket bookings can not be 0 or empty! ",
                                    text: warning,
                                    showConfirmButton: false,
                                    timer: 3000,
                                  });
                                } else if (this.calcFinale()) {
                                  console.log(
                                    "==========final price============="
                                  );
                                  console.log(this.state.ticketPrice);

                                  var basicGrid =
                                    document.getElementById("tickets");
                                  var discountGrid =
                                    document.getElementById("discountsGrid");

                                  basicGrid.style.display = "none";
                                  discountGrid.style.display = "block";
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

              <Grid
                item
                id="discountsGrid"
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
                          Book Ticket
                        </span>
                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "2rem", color: "#AB47BC" }}
                        >
                          Add Coupons
                        </span>

                        <span
                          className="login100-form-title p-b-30"
                          style={{
                            fontSize: "1.5rem",
                            marginTop: "20px",
                          }}
                        >
                          Order Price : {this.state.finalPrice}
                          <br />
                          Your Loyalty Points : {this.state.user.points}
                        </span>

                        <div style={{ padding: "30px" }}>
                          {this.state.coupons &&
                            this.state.coupons.data.map((entryCurrent) => {
                              return (
                                <>
                                  <div
                                    style={{
                                      marginBottom: "30px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      this.addCoupon(
                                        entryCurrent.points,
                                        entryCurrent.value
                                      );
                                    }}
                                  >
                                    <CardCoupons
                                      key={entryCurrent._id}
                                      // event={}
                                      name={entryCurrent.name}
                                      // subtitle={entryCurrent.description}
                                      points={entryCurrent.points}
                                      value={entryCurrent.value}
                                      iconName="fas fa-heart"
                                      btnIcon="fas fa-arrow-right"
                                      bgPhoto={this.state.event.img}
                                      colorTitle={this.state.ticket.ticketColor}
                                      TicketTitle={this.state.ticket.ticketName}
                                    />
                                  </div>
                                </>
                              );
                            })}
                          {/* <CardBooking
                            key={this.state.ticket.id}
                            // event={}
                            title={this.state.event.name}
                            // subtitle={entryCurrent.description}
                            subtitle={this.state.event.date + " , "}
                            time={this.state.event.time}
                            iconName="fas fa-heart"
                            btnIcon="fas fa-arrow-right"
                            bgPhoto={this.state.event.img}
                            secondTitle={this.state.ticket.ticketFinalePrice}
                            totalReviews={30}
                            ratingAverage={4.5}
                            colorTitle={this.state.ticket.ticketColor}
                            TicketTitle={this.state.ticket.ticketName}
                          /> */}
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

                                if (
                                  this.state.ticketQty == "" ||
                                  this.state.ticketQty == 0
                                ) {
                                  Swal.fire({
                                    position: "center",
                                    icon: "info",
                                    title:
                                      "Number of ticket bookings can not be 0 or empty! ",
                                    text: warning,
                                    showConfirmButton: false,
                                    timer: 3000,
                                  });
                                } else if (this.calcFinale()) {
                                  var basicGrid =
                                    document.getElementById("discountsGrid");
                                  var paymetGrid =
                                    document.getElementById("paymentGrid");
                                  basicGrid.style.display = "none";
                                  paymetGrid.style.display = "block";
                                }
                              }}
                              size="lg"
                            >
                              Skip
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
                          Ticket Booking
                        </span>

                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "2rem", color: "#AB47BC" }}
                        >
                          Payment Method
                        </span>

                        {/*  */}

                        <>
                          <div className="nav-wrapper">
                            <Card className="shadow">
                              <CardBody>
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
                                    Total Booking Price
                                  </span>

                                  <span
                                    className="login100-form-title p-b-30"
                                    style={{
                                      fontSize: "1.8rem",
                                      marginTop: "20px",
                                      color: "#AB47BC",
                                    }}
                                  >
                                    {this.state.finalPrice} $
                                  </span>
                                </div>
                              </CardBody>
                            </Card>
                          </div>
                        </>

                        <PayPalButton
                          amount="0.01"
                          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                          onSuccess={(details, data) => {
                            alert(
                              "Transaction completed by " +
                                details.payer.name.given_name
                            );

                            // OPTIONAL: Call your server to save the transaction
                            return fetch("/paypal-transaction-complete", {
                              method: "post",
                              body: JSON.stringify({
                                orderID: data.orderID,
                              }),
                            });
                          }}
                        />

                        {/*  */}

                        <center>
                          <Button
                            style={{ width: "200px", marginBottom: "30px" }}
                            className="mr-4"
                            color="primary"
                            href="#host-event"
                            onClick={() => {
                              var ticketGrid =
                                document.getElementById("tickets");
                              var basicGrid =
                                document.getElementById("paymentGrid");
                              var discountGrid =
                                document.getElementById("discountsGrid");
                              if (this.state.ticketPrice > 0) {
                                basicGrid.style.display = "none";
                                discountGrid.style.display = "block";
                              } else {
                                basicGrid.style.display = "none";
                                ticketGrid.style.display = "block";
                              }
                            }}
                            size="lg"
                          >
                            Back
                          </Button>

                          <Button
                            style={{ width: "200px", marginBottom: "30px" }}
                            className="mr-4"
                            color="warning"
                            href="#host-event"
                            onClick={() => {
                              this.onSubmit();
                            }}
                            size="lg"
                          >
                            Pay
                          </Button>
                        </center>

                        {/* <div className="container-login100-form-btn">
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
                        </div> */}
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
