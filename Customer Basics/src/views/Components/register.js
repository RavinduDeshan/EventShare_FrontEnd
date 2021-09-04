import React, { Component } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbarEmpty";

import Swal from "sweetalert2";
import swal from "sweetalert";
import { Grid } from "@material-ui/core";
import config from "../../configure";

import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import "./css/main.css";
import "./css/util.css";

const styles = (theme) => ({
  root: {
    height: "100vh",
    overflow: "scroll",
  },
  image: {
    backgroundImage:
      "url(https://www.eventstop.co.uk/assets/eventstop-slide2-a3cfcdabf165eb17a660e2604e34ac3b3315107b183f56fcbba470d9384d2758.jpg)",
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

class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassoword = this.onChangePassoword.bind(this);
    this.onChangeConPass = this.onChangeConPass.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);

    this.state = {
      username: "",
      password: "",
      email: "",
      conpass: "",
      firstname: "",
      lastname: "",
      token: "",
    };
  }

  onForgotPassword = (e) => {
    return null;
  };

  componentDidMount() {}

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassoword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConPass(e) {
    this.setState({
      conpass: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  //handle sign in

  onSubmit = (e) => {
    e.preventDefault();

    const User = {
      username: this.state.username,
      password: this.state.password,
      conpass: this.state.conpass,
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
    };

    axios
      .post(
        "http://ec2-34-230-31-219.compute-1.amazonaws.com:8080/detection/",
        User,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {});

    const response = axios
      .post(`http://${config.host}:${config.port}/user/add`, User)
      .then((res) => {
        const warning = res.data.warn;

        if (warning !== null && warning !== undefined) {
          console.log("message is", warning);

          swal({
            title: "Please Try Again",
            text: warning,
            icon: "warning",
            button: true,
            // dangerMode: true,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Registered",
            showConfirmButton: false,
            timer: 3000,
          });

          this.props.history.push("/login");
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
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <Navbar/> */}

        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />

          <Grid
            item
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
                    <form
                      id={"reg"}
                      onSubmit={this.onSubmit}
                      className="login100-form validate-form"
                    >
                      <center>
                        {" "}
                        <Link to={"/"}>
                          <a class="navbar-brand">
                            <img
                              style={{ width: "300px" }}
                              src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
                            />{" "}
                          </a>
                        </Link>
                      </center>
                      <span className="login100-form-title p-b-70">
                        <h4 style={{ marginTop: "2rem" }}>Sign Up</h4>
                      </span>

                      <div
                        className="wrap-input100 validate-input m-t-5 m-b-35"
                        data-validate="Enter username"
                      >
                        First Name
                        <input
                          className="input100"
                          type="text"
                          name="username"
                          placeholder={"EX: John"}
                          required
                          onChange={this.onChangeFirstname}
                          value={this.state.firstname}
                        />
                        <span className="focus-input100"></span>
                      </div>
                      <div
                        className="wrap-input100 validate-input m-t-5 m-b-35"
                        data-validate="Enter username"
                      >
                        Last Name
                        <input
                          className="input100"
                          type="text"
                          name="username"
                          placeholder={"EX: Doily"}
                          required
                          onChange={this.onChangeLastname}
                          value={this.state.lastname}
                        />
                        <span className="focus-input100"></span>
                      </div>
                      <div
                        className="wrap-input100 validate-input m-t-5 m-b-35"
                        data-validate="Enter username"
                      >
                        Email
                        <input
                          className="input100"
                          type="email"
                          name="username"
                          placeholder={"EX: John@exsample.com"}
                          required
                          onChange={this.onChangeEmail}
                          value={this.state.email}
                        />
                        <span className="focus-input100"></span>
                      </div>

                      <div
                        className="wrap-input100 validate-input m-t-5 m-b-35"
                        data-validate="Enter username"
                      >
                        Username
                        <input
                          className="input100"
                          type="text"
                          name="username"
                          placeholder={"EX: John123"}
                          required
                          onChange={this.onChangeUsername}
                          value={this.state.username}
                        />
                        <span className="focus-input100" d></span>
                      </div>

                      <div
                        className="wrap-input100 validate-input m-b-50"
                        data-validate="Enter password"
                      >
                        Password
                        <input
                          className="input100"
                          type="password"
                          name="pass"
                          placeholder={"EX: QWERqwer123!@#"}
                          onChange={this.onChangePassoword}
                          value={this.state.password}
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          required
                        />
                        <span className="focus-input100"></span>
                      </div>

                      <div
                        className="wrap-input100 validate-input m-b-50"
                        data-validate="Enter password"
                      >
                        Confirm Password
                        <input
                          className="input100"
                          type="password"
                          name="pass"
                          placeholder={"Enter Password Again"}
                          onChange={this.onChangeConPass}
                          value={this.state.conpass}
                          required
                        />
                        <span className="focus-input100"></span>
                      </div>

                      <div className="container-login100-form-btn">
                        <button className="login100-form-btn">Sign Up</button>
                      </div>

                      <ul className="login-more p-t-50">
                        <li>
                          <span className="txt1">Already have an account?</span>

                          <a href="#" className="txt2">
                            <Link to={"/login"}> Login</Link>
                          </a>
                        </li>
                      </ul>
                    </form>
                  </div>
                </center>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Register);
