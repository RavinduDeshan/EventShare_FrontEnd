import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import Map from "./map";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
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
import { Icon, InlineIcon } from "@iconify/react";
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
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeOrd = this.onChangeOrd.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.onChangeVenue = this.onChangeVenue.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDurationType = this.onChangeDurationType.bind(this);

    this.onChangeTicketMaxQty = this.onChangeTicketMaxQty.bind(this);

    this.onChangeTicketPrice = this.onChangeTicketPrice.bind(this);
    this.onChangeTicketQty = this.onChangeTicketQty.bind(this);

    this.removerFromTags = this.removerFromTags.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.onSubmitTag = this.onSubmitTag.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.getHost = this.getHost.bind(this);

    this.onForgotPassword = this.onForgotPassword.bind(this);

    this.state = {
      name: "",
      time: "",
      date: "",
      description: "",
      contact: "",
      img: null,
      imgCloud: "",
      organizer: "",
      today: "",
      host: [],
      duration: "",
      coordinates: { lat: 0, lng: 0 },
      address: "",
      tags: [],
      tag: "",
      tabs: 1,
      payT: 0,
      ticketQty: 0,
      ticketMaxQty: 0,
      ticketPrice: 0,
      ticketComission: 0,
      ticketFinalPrice: 0,
      dutationType: "",
      category: null,
      multiOption: false,
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

    this.getHost();

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

  getHost() {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://${config.host}:${config.port}/host/verifyHosting/` +
          this.props.match.params.id,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log("Validation Response: ", res.data);

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
            window.location = "http://localhost:3001/";
          });
        } else {
          this.setState({
            host: res.data.User,
          });

          console.log(this.state.host);
        }
      })
      .catch((err) => {
        swal({
          title: "An Hosting Account Required!",
          text: "Please log in to your Hosting account or upgrade to a hosting Account to host events ",
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
      name: e.target.value,
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

  async onUpload(e) {
    e.preventDefault();

    if (this.state.host.length == 0) {
      swal({
        title:
          "Your Account is not Eligible for Event Hosting! Make sure your account is verified.",
        text: warning,
        icon: "warning",
        button: true,
        // dangerMode: true,
      });
    } else {
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
      console.log("percentage ", this.state.uploadPercentage);

      const formData = new FormData();

      formData.append("img", this.state.img);

      let token = localStorage.getItem("token");

      await axios
        .post(`http://${config.host}:${config.port}/event/upload`, formData, {
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
              title: "Uploading Event Medias on Progress.",
              text: "Please wait a moment",
            });

            setTimeout(() => (this.state.uploadPercentage = 0), 1000);
          },
        })
        .then((res) => {
          console.log("response is: ", res.data);

          if (res.data.URL) {
            this.setState({
              imgCloud: res.data.URL,
            });

            this.onSubmit();
          }
          if (res.data.msg) {
            Swal.fire({
              title: "Upload Interrupted",
              text: res.data.msg,
              icon: "error",

              dangerMode: true,
            });
          }
        })
        .catch((err) => {
          let token = localStorage.getItem("token");

          axios
            .get(
              `http://${config.host}:${config.port}/login/session-validate`,
              {
                headers: {
                  token: token,
                },
              }
            )
            .then((res) => {
              Swal.fire({
                title: "Upload Interrupted",
                text: "Selected File is not an Image or in unsupported file format or Upload is interrupted Due to Server Error, Upload failed! ",
                icon: "error",
                // buttons: true,
                dangerMode: true,
              });
            })
            .catch((err) => {
              Swal.fire({
                title: "Event Hosting Interrupted",
                text: "Session has Expired Please Log in! ",
                icon: "error",

                dangerMode: true,
              });
            });
        });
    }
  }

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
      name: this.state.name,
      category: this.state.category,
      date: this.state.date,
      time: this.state.time,
      duration: this.state.duration,
      durationType: this.state.dutationType,
      description: this.state.description,
      img: this.state.imgCloud,
      contact: this.state.contact,
      tags: this.state.tags,
      coordinates: this.state.coordinates,
      organizer: this.state.host.userId,
    };

    console.log("=============entry is ===============");
    console.log(Entry);
    console.log("====================================");

    let token = localStorage.getItem("token");
    const response = axios
      .post(`http://${config.host}:${config.port}/event/add`, Entry, {
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
            title: "Uploading Event Media...",
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
            title: "Successfully Saved Event! Please add Tickets!",
            showConfirmButton: false,
            timer: 3000,
          });

          console.log("=======Entry Response after submit====");
          console.log(res);
          console.log("====================================");

          let id = res.data.responseEntry._id;
          this.props.history.push("/add-ticket/" + id);
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

  onMultiSubmit() {
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
      name: this.state.name,
      category: this.state.category,
      date: this.state.date,
      time: this.state.time,
      duration: this.state.duration,
      durationType: this.state.dutationType,
      description: this.state.description,
      img: this.state.imgCloud,
      contact: this.state.contact,
      tags: this.state.tags,
      coordinates: this.state.coordinates,
      organizer: this.state.host.userId,
      multiOption: this.state.multiOption,
    };

    console.log("=============entry is ===============");
    console.log(Entry);
    console.log("====================================");

    let token = localStorage.getItem("token");
    const response = axios
      .post(`http://${config.host}:${config.port}/event/add`, Entry, {
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
            title: "Uploading Event Media...",
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
            title: "Successfully Hosted the Event!",
            showConfirmButton: false,
            timer: 3000,
          });

          let event_id = res.data._id;

          console.log("=============Event id==============");
          console.log(event_id);
          console.log("====================================");
          this.props.history.push("/add-ticket/" + event_id);
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

              {/* basic */}
              <Grid
                item
                id="basic"
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
              >
                <div className="limiter">
                  <div className="container-login100">
                    <center>
                      <div className="wrap-login100 p-t-85 p-b-20">
                        <span className="login100-form-title p-b-70">
                          Host Event
                        </span>
                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "2rem", color: "#AB47BC" }}
                        >
                          Basic Information
                        </span>
                        <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter username"
                        >
                          <span
                            className="login100-form-title p-b-30"
                            style={{ fontSize: "1.5rem", marginTop: "20px" }}
                          >
                            Event Name
                          </span>

                          <input
                            className="input100"
                            type="text"
                            name="username"
                            placeholder={"EX: Vertigo"}
                            required
                            onChange={this.onChangeName}
                            value={this.state.name}
                          />
                          <span className="focus-input100"></span>
                        </div>

                        <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter username"
                        >
                          <span
                            className="login100-form-title p-b-30"
                            style={{ fontSize: "1.5rem", marginTop: "20px" }}
                          >
                            Event Category
                          </span>

                          <select
                            className="input100"
                            style={{ marginTop: "10px" }}
                            required
                            onChange={this.onChangeCategory}
                            value={this.state.category}
                          >
                            <option value="Music Concert">Music Concert</option>
                            <option value="Exhibision">Exhibision</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Festival">Festival</option>
                            <option value="Celebration">Celebration</option>
                            <option value="Party">Party</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Outdoor Event">Outdoor Event</option>
                            <option value="Indoor Event">Indoor Event</option>
                            <option value="Charity Event">Charity Event</option>
                          </select>
                          <span className="focus-input100"></span>
                        </div>
                        <div
                          className="wrap validate-input m-t-5 m-b-35"
                          data-validate="Select Event Date"
                        >
                          <span
                            className="login100-form-title p-b-30"
                            style={{ fontSize: "1.5rem", marginTop: "20px" }}
                          >
                            Event Date
                          </span>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              className={"input100"}
                              disablePast={true}
                              // required={"true"}
                              // InputProps={{inputProps: {min: "2020-06-13"}}}
                              // id="date"
                              // label=""
                              // type="date"
                              value={this.state.date}
                              onChange={this.onChangeDate}
                              // defaultValue={new Date()}
                              // disablePast="true"

                              // className={"input100"}
                              // InputLabelProps={{
                              //     shrink: true,
                              // }}
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                        <div
                          className="wrap validate-input m-t-5 m-b-35"
                          data-validate="Enter Time"
                        >
                          <span
                            className="login100-form-title p-b-30"
                            style={{ fontSize: "1.5rem", marginTop: "20px" }}
                          >
                            Start Time
                          </span>
                          <TextField
                            required={"true"}
                            id="time"
                            label=""
                            type="time"
                            defaultValue="00:00"
                            value={this.state.time}
                            onChange={this.onChangeTime}
                            className={"input100"}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                            }}
                          />
                        </div>
                        <div>
                          <span
                            className="login100-form-title p-b-30"
                            style={{ fontSize: "1.5rem", marginTop: "20px" }}
                          >
                            Select Event Duration
                          </span>
                          <Grid container>
                            <Grid
                              item
                              xs={6}
                              sm={6}
                              md={6}
                              style={{ float: "left" }}
                            >
                              <div
                                className="wrap-input100 validate-input m-t-5 m-b-35"
                                data-validate="Enter username"
                              >
                                <input
                                  className="input100"
                                  type="text"
                                  name="username"
                                  placeholder={"Enter Duration"}
                                  required
                                  onChange={this.onChangeDuration}
                                  value={this.state.duration}
                                />
                                <span className="focus-input100"></span>
                              </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <select
                                name="Duration"
                                className="input100"
                                style={{ width: "100px", marginTop: "10px" }}
                                required
                                onChange={this.onChangeDurationType}
                                value={this.state.dutationType}
                              >
                                <option value="min">Mins</option>
                                <option value="hr">Hours</option>
                              </select>
                            </Grid>
                          </Grid>
                        </div>
                        <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter Description"
                        >
                          <span
                            className="login100-form-title p-b-30"
                            style={{ fontSize: "1.5rem", marginTop: "20px" }}
                          >
                            Event Description
                          </span>
                          <textarea
                            className="input100"
                            name="username"
                            placeholder={
                              "EX: The best event of the month. Enjoy the life!"
                            }
                            required
                            onChange={this.onChangeDesc}
                            value={this.state.description}
                          />
                          <span className="focus-input100" d></span>
                        </div>
                        <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter username"
                        >
                          <span
                            className="login100-form-title p-b-30"
                            style={{ fontSize: "1.5rem", marginTop: "20px" }}
                          >
                            Event Hotline
                          </span>
                          <input
                            className="input100"
                            type="text"
                            name="username"
                            placeholder={"EX: 0112565842"}
                            required
                            onChange={this.onChangeContact}
                            value={this.state.contact}
                          />
                          <span className="focus-input100"></span>
                        </div>
                        <div
                          className="wrap validate-input m-b-50"
                          data-validate="Enter password"
                        >
                          <span
                            className="login100-form-title p-b-30"
                            style={{ fontSize: "1.5rem", marginTop: "20px" }}
                          >
                            Main Event Image (Compulsory)
                          </span>
                          <br />
                          <div
                            style={{
                              color: "#AB47BC",

                              marginBottom: "30px",
                              borderRadius: "30px",
                              borderStyle: "dashed",

                              borderWidth: "1px",
                              width: "100%",
                            }}
                          >
                            <Icon
                              icon={uploadIcon}
                              color="#AB47BC"
                              width="50"
                              height="50"
                            />

                            <input
                              style={{ padding: "20px" }}
                              accept=".gif,.jpg,.jpeg,.png"
                              type="file"
                              name="pass"
                              onChange={this.onChangeImg}
                            />
                          </div>
                        </div>
                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "1.5rem", marginTop: "20px" }}
                        >
                          Event Tags
                        </span>
                        <Grid container>
                          <Grid
                            item
                            xs={6}
                            sm={6}
                            md={6}
                            style={{ float: "left" }}
                          >
                            <div
                              className="wrap-input100 validate-input m-t-5 m-b-35"
                              data-validate="Enter username"
                            >
                              <input
                                className="input100"
                                type="text"
                                name="username"
                                placeholder={"EX: Music"}
                                required
                                onChange={this.onChangeTag}
                                value={this.state.tag}
                              />
                              <span className="focus-input100"></span>
                            </div>
                          </Grid>
                          {/* next grid */}
                          <Grid item xs={6} sm={6} md={6}>
                            <Button
                              style={{ width: "30px" }}
                              className="mr-4"
                              color="default"
                              onClick={this.onSubmitTag}
                              size="sm"
                            >
                              +
                            </Button>
                          </Grid>
                        </Grid>
                        <div
                          style={{
                            marginTop: "30px",
                            marginBottom: "30px",
                            borderRadius: "50px",
                            borderStyle: "dashed",
                            padding: "30px",
                            borderWidth: "1px",
                            width: "100%",
                          }}
                        >
                          {this.state.tags.length == 0 && "Add tags"}
                          {this.TagList()}
                        </div>
                        <div>
                          <Button
                            style={{ width: "200px" }}
                            className="mr-4"
                            color="primary"
                            href="#pablo"
                            onClick={() => {
                              let push = true;
                              if (this.state.name == "") {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title: "Event name can not be empty!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });

                                push = false;
                              } else if (this.state.category == "") {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title: "Please select a Event Category!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });

                                push = false;
                              } else if (this.state.date == "") {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title: "Event Date is not selected!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });

                                push = false;
                              } else if (this.state.time == "") {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title: "Event Start time is not selected!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });

                                push = false;
                              } else if (this.state.duration == "") {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title: "Event duration cannot be empty!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });

                                push = false;
                              } else if (this.state.dutationType == "") {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title:
                                    "Event Duration type ( mins / hrs ) is not selected!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });

                                push = false;
                              } else if (this.state.description == "") {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title: "Event decription cannot be empty!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });

                                push = false;
                              } else if (this.state.contact == "") {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title: "Event hotline can not be empty!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });

                                push = false;
                              } else if (this.state.img == null) {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title: "No event image is selected!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });

                                push = false;
                              }

                              if (push) {
                                var basicGrid =
                                  document.getElementById("basic");
                                var venueGrid =
                                  document.getElementById("venue");
                                basicGrid.style.display = "none";
                                venueGrid.style.display = "block";
                              }
                            }}
                            size="lg"
                          >
                            Next
                          </Button>
                        </div>
                        <ul className="login-more p-t-50">
                          <li>
                            <span className="txt1">Changed your mind?</span>

                            <a href="#" className="txt2">
                              <Link to={"/home"}> Cancel</Link>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </center>
                  </div>
                </div>
              </Grid>

              {/* venue */}

              {/* venue */}
              <Grid
                item
                id="venue"
                xs={8}
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
                          Host Event
                        </span>

                        <span
                          className="login100-form-title p-b-30"
                          style={{ fontSize: "2rem", color: "#AB47BC" }}
                        >
                          Venue Information
                        </span>

                        {/* search */}

                        <div>
                          <center>
                            <PlacesAutocomplete
                              value={this.state.address}
                              onChange={this.onChangeAddress}
                              onSelect={this.onChangeVenue}
                            >
                              {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps,
                                loading,
                              }) => (
                                <div
                                  className="wrap-input100 validate-input m-t-5 m-b-35"
                                  data-validate="Enter Place"
                                >
                                  <input
                                    className="input100"
                                    type="text"
                                    name="place"
                                    {...getInputProps({
                                      placeholder: "Search Places ...",
                                    })}
                                  />
                                  <span className="focus-input100"></span>
                                  <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion) => {
                                      // inline style for demonstration purpose
                                      const style = suggestion.active
                                        ? {
                                            backgroundColor: "#F3E5F5",
                                            cursor: "pointer",
                                            padding: "30px",
                                            borderRadius: "50px",
                                          }
                                        : {
                                            backgroundColor: "#ffffff",
                                            cursor: "pointer",
                                            padding: "30px",
                                          };
                                      return (
                                        <div
                                          className="input-suggestion"
                                          {...getSuggestionItemProps(
                                            suggestion,
                                            {
                                              style,
                                            }
                                          )}
                                        >
                                          <Icon
                                            icon={mapMarker}
                                            color="#AB47BC"
                                            width="30"
                                            height="30"
                                          />{" "}
                                          <span>{suggestion.description}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </PlacesAutocomplete>
                          </center>
                        </div>

                        {/* search */}

                        {/* <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter username"
                        >
                          Address
                          <input
                            className="input100"
                            type="text"
                            name="username"
                            placeholder={"EX: Vertigo"}
                            required
                            onChange={this.onChangeName}
                            value={this.state.name}
                          />
                          <span className="focus-input100"></span>
                        </div>

                        <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter username"
                        >
                          City
                          <input
                            className="input100"
                            type="text"
                            name="username"
                            placeholder={"EX: Vertigo"}
                            required
                            onChange={this.onChangeName}
                            value={this.state.name}
                          />
                          <span className="focus-input100"></span>
                        </div>

                        <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter username"
                        >
                          Province
                          <input
                            className="input100"
                            type="text"
                            name="username"
                            placeholder={"EX: Vertigo"}
                            required
                            onChange={this.onChangeName}
                            value={this.state.name}
                          />
                          <span className="focus-input100"></span>
                        </div>

                        <div
                          className="wrap-input100 validate-input m-t-5 m-b-35"
                          data-validate="Enter username"
                        >
                          Country
                          <input
                            className="input100"
                            type="text"
                            name="username"
                            placeholder={"EX: Vertigo"}
                            required
                            onChange={this.onChangeName}
                            value={this.state.name}
                          />
                          <span className="focus-input100"></span>
                        </div> */}

                        <div>
                          <Button
                            style={{ width: "200px", marginBottom: "30px" }}
                            className="mr-4"
                            color="primary"
                            href="#host-event"
                            onClick={() => {
                              var basicGrid = document.getElementById("basic");
                              var venueGrid = document.getElementById("venue");
                              basicGrid.style.display = "block";
                              venueGrid.style.display = "none";
                            }}
                            size="lg"
                          >
                            Back
                          </Button>

                          <Button
                            style={{ width: "200px" }}
                            className="mr-4"
                            color="info"
                            href="#host-event"
                            onClick={(e) => {
                              e.preventDefault();
                              let push = true;
                              if (
                                this.state.coordinates.lat == 0 ||
                                this.state.coordinates.lng == 0
                              ) {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title: "Please select a event venue!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });

                                push = false;
                              }

                              if (push) {
                                this.onUpload(e);
                              }
                            }}
                            size="lg"
                          >
                            Next
                          </Button>
                        </div>

                        <ul className="login-more p-t-50">
                          <li>
                            <span className="txt1">Changed your mind?</span>

                            <a href="#" className="txt2">
                              <Link to={"/home"}> Cancel</Link>
                            </a>
                          </li>
                        </ul>
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
