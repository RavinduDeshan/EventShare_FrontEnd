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
import Icons from "views/examples/eventsList";
import HostAccount from "views/examples/HostAccount";
import Tickets from "views/examples/Tickets/Tickets";
import EventIndex from "views/eventIndex";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/host",
  },
  {
    path: "/events",
    name: "Hosted Events",
    icon: "ni ni-spaceship text-orange ",
    component: Icons,
    layout: "/host",
  },

  {
    path: "/tickets/:id",
    name: "Tickets",
    icon: "ni ni-spaceship text-orange ",
    component: Tickets,
    layout: "/host",
  },

  {
    path: "/event/:id",
    name: "Event",
    icon: "ni ni-spaceship text-orange ",
    component: EventIndex,
    layout: "/host",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/host",
  // },
  {
    path: "/user-profile/",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/host",
  },
  // {
  //   // path: "/tables",
  //   // name: "Tables",
  //   // icon: "ni ni-bullet-list-67 text-red",
  //   // component: Tables,
  //   // layout: "/host",
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
    path: "/settings/",
    name: "Hosting Account Settings",
    icon: "ni ni-settings text-blue",
    component: HostAccount,
    layout: "/host",
  },
];
export default routes;
