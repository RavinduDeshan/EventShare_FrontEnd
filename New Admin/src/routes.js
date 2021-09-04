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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import UsersIndex from "views/UsersIndex";
import HostAccount from "views/examples/HostAccount";
import EventHostList from "views/eventHostsList";
import EventsList from "views/EventList";
import BookingList from "views/BookingList";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/account",
  },
  {
    path: "/Events",
    name: "Events",
    icon: "ni ni-spaceship text-red",
    component: EventsList,
    layout: "/account",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/account",
  // },

  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/account",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
  {
    path: "/Bookings/",
    name: "Bookings",
    icon: "ni ni-cart text-blue",
    component: BookingList,
    layout: "/account",
  },

  {
    path: "/Users/",
    name: "Booking Customers",
    icon: "ni ni-single-02 text-green",
    component: UsersIndex,
    layout: "/account",
  },
  {
    path: "/Hosts/",
    name: "Event Hosts",
    icon: "ni ni-single-02 text-red",
    component: EventHostList,
    layout: "/account",
  },

  {
    path: "/Settings/",
    name: "Profile Settings ",
    icon: "ni ni-settings text-black",
    component: Profile,
    layout: "/account",
  },
];
export default routes;
