import React, { Component } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";

import swal from "sweetalert2";
import config from "../../configure";
import "./css/main.css";
import "./css/util.css";
import Card from "./Event/Card15";
import styled from "styled-components";

//card component

const Container = styled.div`
  padding: 150px;
  
  position: center
  padding-bottom: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 50px;
  grid-auto-rows: 100px;
  grid-template-rows: 300px 300px 300px;
  & > div {
    grid-column: span 2;
    
  
    }
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-gap: 50px;
    padding: 20px;
    & > div {
      grid-column: span 2 !important;
    }
  }
`;

export default class events extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassoword = this.onChangePassoword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
    this.getAllEntries = this.getAllEntries.bind(this);
    this.EventList = this.EventList.bind(this);
    this.state = {
      token: "",
      events: [],
    };
  }

  onForgotPassword = (e) => {
    return null;
  };

  componentDidMount() {
    this.getAllEntries();
  }

  EventList() {
    return this.state.events.map((entryCurrent) => {
      return (
        <Card
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
        />

        // <Card

        //     key={entryCurrent._id}

        //     event={entryCurrent}
        // />
      );
    });
  }

  getAllEntries() {
    axios
      .get(`http://${config.host}:${config.port}/event/`)
      .then((res) => {
        this.setState({
          events: res.data.data,
        });

        console.log("Entries are ", this.state.entries);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      .post(`http://${config.host}:${config.port}/login/`, login)
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

          swal({
            title: "Successful",
            text: "You have Logged In Successfully!",
            icon: "success",
            button: "Continue",
            timer: 2000,
          });

          const id = res.data.Login.id;
          const username = res.data.Login.username;
          const email = res.data.Login.email;
          const role = res.data.Login.role;

          //set user details in local storage
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          localStorage.setItem("username", username);
          localStorage.setItem("email", email);
          localStorage.setItem("role", role);

          this.props.history.push("/admin/dashboard");
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
    return (
      <div>
        <Navbar />

        <Container>{this.EventList()}</Container>
      </div>
    );
  }
}
