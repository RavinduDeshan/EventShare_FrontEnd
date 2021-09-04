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
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import HostLayout from "layouts/Host.js";
import AuthLayout from "layouts/Auth.js";
import UpgradeUser from "views/examples/upgradeForm/upgradeUser";
import HostEvent from "views/examples/HostEvent/Layout";
import Validator from "./Validator/Validate";
import ContextStep from "./views/examples/upgradeForm/StepContext";
import HostEventContextStep from "./views/examples/HostEvent/StepContext";
import Pdf from "./views/examples/Pdf/pdf";
import PdfTrendings from "./views/examples/Pdf/pdfTrends";

let id = localStorage.getItem("id");
let token = localStorage.getItem("token");
let username = localStorage.getItem("username");

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/pdf/:id" render={(props) => <Pdf {...props} />} />
      <Route
        path="/pdf-trends/"
        render={(props) => <PdfTrendings {...props} />}
      />
      <Route path="/account" render={(props) => <AdminLayout {...props} />} />
      <Route
        path="/validate/:id/:token/:username"
        render={(props) => <Validator {...props} />}
      />

      <Route path="/host" render={(props) => <HostLayout {...props} />} />
      <ContextStep>
        <Route path="/upgrade" render={(props) => <UpgradeUser {...props} />} />
      </ContextStep>
      <HostEventContextStep>
        <Route path="/event" render={(props) => <HostEvent {...props} />} />
      </HostEventContextStep>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect
        from="/"
        to={"/validate/" + id + "/" + token + "/" + username}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
