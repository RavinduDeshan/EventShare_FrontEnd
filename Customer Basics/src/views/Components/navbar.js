import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./css/argon.css";
import { Icon, InlineIcon } from "@iconify/react";
import userIcon from "@iconify-icons/mi/user";
import gridIcon from "@iconify-icons/mi/grid";
import heartIcon from "@iconify-icons/mi/heart";
import logIn from "@iconify-icons/mi/log-in";
import logOut from "@iconify-icons/mi/log-out";
import fogIcon from "@iconify-icons/mi/fog";
import notificationIcon from "@iconify-icons/mi/notification";
import InfoArea from "components/InfoArea/InfoArea.js";
import Timeline from "@material-ui/icons/Timeline";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import SecurityIcon from "@material-ui/icons/Security";

// create pdfs

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Badge,
} from "reactstrap";
import { Hidden } from "@material-ui/core";

export default class NavComp extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  //handle log out

  logout() {
    localStorage.setItem("token", null);

    localStorage.setItem("username", "");
    localStorage.setItem("id", "");
    localStorage.setItem("email", "");
    localStorage.setItem("firstname", "");
    localStorage.setItem("avatar", "");

    const token = localStorage.getItem("token");

    console.log("Logout method called : Token is : ", token);
    console.log(
      "Logout method called : username is : ",
      localStorage.getItem("username")
    );

    window.location = "http://localhost:3001/login";
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white sticky-top">
        <div className={"container-fluid"}>
          <Link to={"/"}>
            <a class="navbar-brand">
              <img
                style={{ width: "300px" }}
                src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
              />{" "}
            </a>
          </Link>
          <button
            className={"navbar-toggler"}
            type={"button"}
            data-toggle={"collapse"}
            data-target={"#navbarResponsive"}
          >
            <span className={"navbar-toggler-icon"}></span>
          </button>
          <div className={"collapse navbar-collapse"} id={"navbarResponsive"}>
            <ul className={"navbar-nav ml-auto"}>
              <li style={{ paddingRight: "50px" }} class={"nav-item"}>
                <a className={"nav-link"} href={"#"}>
                  <Link to={"/"}>
                    <h3>Home</h3>
                  </Link>
                </a>
              </li>
              <li style={{ paddingRight: "50px" }} className={"nav-item"}>
                <Link to={"/search"}>
                  {" "}
                  <a className={"nav-link"} href={"#"}>
                    <h3>Browse Events</h3>
                  </a>
                </Link>
              </li>

              {/* <li style={{ paddingRight: "50px" }} className={"nav-item"}>
                <Link to={"/events"}>
                  {" "}
                  <a className={"nav-link"} href={"#"}>
                    <h3>Favourites</h3>
                  </a>
                </Link>
              </li> */}

              <li
                className={"nav-item"}
                style={{
                  paddingRight: "50px",
                  display:
                    localStorage.getItem("username") === "" ? "none" : "block",
                }}
              >
                <Link to={"/event-registry/" + localStorage.getItem("id")}>
                  {" "}
                  <a className={"nav-link"} href={"#"}>
                    <h3 style={{ color: "#FF8A65" }}>Host an Event</h3>
                  </a>{" "}
                </Link>
              </li>

              <li
                className={"nav-item"}
                style={{
                  paddingRight: "50px",
                  display:
                    localStorage.getItem("username") === "" ? "block" : "none",
                }}
              >
                <Link to={"/signup"}>
                  {" "}
                  <a
                    style={{ color: "#786AFF" }}
                    className={"nav-link"}
                    href={"#"}
                  >
                    <h3 style={{ color: "#9575CD" }}>SignUp</h3>
                  </a>
                </Link>
              </li>

              {/* notification icon */}
              {/* {localStorage.getItem("username") && (
                <li className="nav-item dropdown">
                  <Nav className="align-items-center d-none d-md-flex" navbar>
                    <UncontrolledDropdown nav>
                      <DropdownToggle className="pr-0" nav>
                        <Media className="align-items-center">
                          <Icon
                            width="30"
                            height="30"
                            icon={notificationIcon}
                          />

                          <Media className="ml-1 d-none d-lg-block">
                            <Badge style={{ marginLeft: -5 }} color="danger">
                              14
                            </Badge>
                          </Media>
                        </Media>
                      </DropdownToggle>
                      <DropdownMenu
                        className="dropdown-menu-arrow"
                        right
                        style={{ width: "500px", overflow: scroll }}
                      >
                        <DropdownItem className="noti-title" header tag="div">
                          <h6 className="text-overflow m-0">Notifications</h6>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            window.location =
                              "http://localhost:3000/account/index/";
                          }}
                          tag={Link}
                          style={{
                            backgroundColor:
                              localStorage.getItem("username") === ""
                                ? "none"
                                : "#E1BEE7",
                          }}
                        >
                          <InfoArea
                            title="Marketing"
                            description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                            icon={InfoIcon}
                            iconColor="rose"
                            time="9 hrs ago"
                          />
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </li>
              )} */}

              {/* profile icon */}
              <li
                style={{ paddingRight: "50px" }}
                className="nav-item dropdown"
              >
                <Nav className="align-items-center d-none d-md-flex" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center">
                        {localStorage.getItem("avatar") && (
                          <span className="avatar avatar-sm rounded-circle">
                            <img
                              alt="..."
                              src={localStorage.getItem("avatar")}
                            />
                          </span>
                        )}
                        {!localStorage.getItem("avatar") && (
                          <span className="avatar avatar-sm white">
                            <Icon
                              icon={userIcon}
                              color="#673AB7"
                              width="60"
                              height="60"
                            />
                          </span>
                        )}
                        <Media className="ml-2 d-none d-lg-block">
                          <span className="mb-0 text-sm font-weight-bold">
                            {localStorage.getItem("username") &&
                              localStorage.getItem("username")}
                          </span>
                        </Media>
                      </Media>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem className="noti-title" header tag="div">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          window.location =
                            "http://localhost:3000/account/index/";
                        }}
                        tag={Link}
                        style={{
                          display:
                            localStorage.getItem("username") === ""
                              ? "none"
                              : "block",
                        }}
                      >
                        <Icon icon={fogIcon} width="20" height="20" />

                        <span> Timeline </span>
                      </DropdownItem>

                      <DropdownItem
                        onClick={() => {
                          window.location =
                            "http://localhost:3000/account/user-profile/";
                        }}
                        tag={Link}
                        style={{
                          display:
                            localStorage.getItem("username") === ""
                              ? "none"
                              : "block",
                        }}
                      >
                        <Icon icon={gridIcon} width="20" height="20" />

                        <span> My profile</span>
                      </DropdownItem>

                      <DropdownItem to="/favoutites" tag={Link}>
                        <Icon
                          color="#E91E63"
                          icon={heartIcon}
                          width="20"
                          height="20"
                        />
                        <span style={{ color: "#E91E63" }}>Favourites</span>
                      </DropdownItem>

                      <DropdownItem divider />
                      <DropdownItem
                        style={{
                          color: "#F44336",
                          display:
                            localStorage.getItem("username") === ""
                              ? "none"
                              : "block",
                        }}
                        onClick={this.logout}
                      >
                        <Icon
                          icon={logOut}
                          color="#F44336"
                          width="20"
                          height="20"
                        />
                        <span>Logout</span>
                      </DropdownItem>
                      <Link to="/login">
                        <DropdownItem
                          style={{
                            color: "#673AB7",
                            display:
                              localStorage.getItem("username") === ""
                                ? "block"
                                : "none",
                          }}
                        >
                          <Icon
                            icon={logIn}
                            color="#673AB7"
                            width="20"
                            height="20"
                          />
                          <span>LogIn</span>
                        </DropdownItem>
                      </Link>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
