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
import React, { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";
import config from "../configure";

// reactstrap components

const Validator = () => {
  let { id, token, username } = useParams();

  const [idP, setId] = useState(id ? id : "000");
  const [tokenP, setToken] = useState(token ? token : "000");
  const [usernameP, setUsername] = useState(username ? username : "000");

  // alert(usernameP);

  const getUser = () => {
    setId(id);
    setToken(token);
    setUsername(username);
  };

  const validatePush = () => {
    if (id != "000" && token != "000") {
      localStorage.setItem("id", idP);
      localStorage.setItem("token", tokenP);
      localStorage.setItem("username", usernameP);

      window.location.href = "http://localhost:3003/account/index";
    } else {
      window.location.href = "http://localhost:3001/login";
    }
  };

  useEffect(() => {
    getUser();
    validatePush();
  }, []);

  return <></>;
};

export default Validator;
