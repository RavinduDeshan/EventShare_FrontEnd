import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
// import Components from "views/Components/Components.js";
// import LandingPage from "views/LandingPage/LandingPage.js";
// import ProfilePage from "views/ProfilePage/ProfilePage.js";
// import LoginPage from "views/LoginPage/LoginPage.js";
import Login from "./views/Components/login";
import Reg from "./views/Components/register";

import Home from "./views/Components/home";
import AddEvent from "./views/Components/addevent";
import AllEvent from "./views/Components/events";
import emailVal from "./views/Components/emailActivator";
import Event from "./views/LandingPage/LandingPage";
import AddTicket from "./views/Components/addTicket";
import AddBooking from "./views/Components/addBooking";
import addBooking from "./views/Components/addBooking";
import search from "./views/Components/searchEvents";

// import BookingUserDashboard from './views/Components/BookingUserDashboard'

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/" component={Components} /> */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Reg} />
      <Route path="/activate/:id" component={emailVal} />
      <Route path="/event/:id" component={Event} />
      <Route path="/add-ticket/:id" component={AddTicket} />{" "}
      <Route path="/booking/:id/:eventId/:refId" component={addBooking} />
      <Route path="/booking/:id/:eventId" component={addBooking} />
      <Route path="/event-registry/:id" component={AddEvent} />
      <Route path="/events" component={AllEvent} />
      <Route path="/search" component={search} />
      {/* <Route path="/myAccount" component={BookingUserDashboard}/> */}
      <Route path="/" component={Home} />
    </Switch>
  </Router>,

  document.getElementById("root")
);
