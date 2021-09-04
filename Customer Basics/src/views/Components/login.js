import React, { Component } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbarEmpty";
import Swal from "sweetalert2";
import swal from "sweetalert";
import config from "../../configure";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import "./css/main.css";
import "./css/util.css";
import { Button } from "reactstrap";

const styles = (theme) => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80)",
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassoword = this.onChangePassoword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);

    this.state = {
      username: "",
      password: "",
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

  //handle sign in

  onSubmit = (e) => {
    e.preventDefault();

    const login = {
      username: this.state.username,
      password: this.state.password,
    };

    const response = axios
      .post(`http://${config.host}:${config.port}/user/validate`, login)
      .then((res) => {
        const token = res.data.token;
        const warning = res.data.msg;

        if (warning !== null && warning !== undefined) {
          console.log("message is", warning);

          swal({
            title: "Please Try Again",
            text: warning,
            icon: "warning",
            button: true,
            // dangerMode: true,
          });
        } else if (token) {
          console.log("Signed in token Success block :", token);

          console.log("Signed in :", res);

          swal({
            title: "Successful",
            text: "You have Logged In Successfully!",
            icon: "success",
            button: "Continue",
            timer: 2000,
          });

          const id = res.data.User.id;
          const username = res.data.User.username;
          const email = res.data.User.email;
          const firstname = res.data.User.firstname;
          const lastname = res.data.User.lastname;
          let avatar = res.data.User.img;

          if (avatar == "" || avatar == undefined) {
            avatar = "";
          }

          //set user details in local storage
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          localStorage.setItem("username", username);
          localStorage.setItem("email", email);
          localStorage.setItem("firstname", firstname);
          localStorage.setItem("lastname", lastname);
          localStorage.setItem("avatar", avatar);

          if (username == "admin98765432375") {
            window.location.href =
              "http://localhost:3003/validate/" +
              id +
              "/" +
              token +
              "/" +
              username;
          } else {
            window.location.href =
              "http://localhost:3000/validate/" +
              id +
              "/" +
              token +
              "/" +
              username;
          }

          // this.props.history.push('/myAccount');
        }

        //    alert('Successfuly Loged In')
      })
      .catch((err) => {
        swal({
          title: "Please Try Again",
          text: "Error Occurred",
          icon: "error",
          // buttons: true,
          dangerMode: true,
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
                <div className="wrap-login100 p-t-85 p-b-20">
                  <form
                    id={"login"}
                    className="login100-form validate-form"
                    onSubmit={this.onSubmit}
                  >
                    {/* <span className="login100-form-title p-b-70">
						Welcome
					</span>
                                <span className="login100-form-avatar">
						<img
                            src="https://res.cloudinary.com/fashionistaimage/image/upload/v1591955380/undraw_male_avatar_323b_tag4hm.png"
                            alt="AVATAR"/>
					</span> */}

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

                    <div
                      className="wrap-input100 validate-input m-t-85 m-b-35"
                      data-validate="Enter username"
                    >
                      Username
                      <input
                        onChange={this.onChangeUsername}
                        className="input100"
                        type="text"
                        name="username"
                        placeholder={"Ex: John32"}
                        id="username"
                        value={this.state.username}
                      />
                      <span className="focus-input100"></span>
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
                        placeholder={"Ex: QWERqwer123!@#"}
                        onChange={this.onChangePassoword}
                        id="password"
                        value={this.state.password}
                      />
                      <span className="focus-input100"></span>
                    </div>

                    <div className="container-login100-form-btn">
                      <button className="login100-form-btn">Login</button>
                    </div>

                    <ul className="login-more p-t-50">
                      <li className="m-b-8">
                        <span className="txt1"></span>

                        <a href="#" className="txt2">
                          Forgot Password?
                        </a>
                      </li>

                      <li>
                        <span className="txt1">Want to Create an Account?</span>

                        <a href="#" className="txt2">
                          <Link to={"/signup"}> Sign up </Link>
                        </a>
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Login);
