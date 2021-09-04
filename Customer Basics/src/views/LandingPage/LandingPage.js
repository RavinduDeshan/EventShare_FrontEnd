import { React, useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../views/Components/navbar";
import Map from "../Components/map";
import inboxIcon from "@iconify-icons/mi/inbox";
import { Icon, InlineIcon } from "@iconify/react";
import { ShareSocial } from "react-share-social";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  FacebookShareCount,
} from "react-share";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Tickets from "views/Components/Tickets/Tickets";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

const styleBox = {
  innerWidth: "1000px",
  borderRadius: 3,
  border: 0,

  color: "white",
  padding: "0 0px",
};

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import { EventAvailableOutlined } from "@material-ui/icons";

function LandingPage(props) {
  let { id } = useParams();
  let { rid } = useParams();
  const useStyles = makeStyles(styles);

  const classes = useStyles();
  // const { ...rest } = props;

  const [Event, setEvent] = useState("");
  const [Rate, setRate] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  let final;
  const getAvgRates = (rates) => {
    let count = rates.length;
    let tot = 0;

    rates.map((rate) => {
      if (rate.score) {
        tot = tot + rate.score;

        console.log("=================tot==============");
        console.log(parseInt(tot));
        console.log("====================================");
      }
    });
    final = tot / count;

    setRate(Math.round(final * 2) / 2);
  };

  const doSettng = () => {
    if (rid) {
      localStorage.setItem("rid", rid);
      localStorage.setItem("revent", id);

      console.log("==============rid==============");
      console.log(rid);
      console.log("====================================");
    }
  };

  useEffect(async () => {
    await axios
      .get(`http://localhost:443/event/` + id)
      .then((res) => {
        console.log("res is", res.data.data);

        setEvent(res.data.data);
        setLat(res.data.data.coordinates.lat);
        setLng(res.data.data.coordinates.lng);

        getAvgRates(res.data.data.rates);
      })
      .catch((err) => {
        console.log(err);
      });

    doSettng();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Parallax filter image={Event.img != "undefined" ? Event.img : ""}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 style={{ fontSize: "3rem" }} className={classes.title}>
                {Event.name != "undefined" ? Event.name : ""}
              </h1>
              <h4 style={{ color: "#E1BEE7", fontSize: "2rem" }}>
                {Event.category != "undefined" ? Event.category : ""}
              </h4>
              <br />
              <Button
                color="primary"
                size="lg"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={inboxIcon} />
                Buy Ticket
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection
            name={Event.name}
            description={Event.description}
            date={Event.date}
            time={Event.time}
            rate={Rate ? Rate : 3}
          />
          <>
            {/* <Map
              height="300px"
              zoom={15}
              center={{
                lat: 6.998,
                lng: 76.988,
              }}
            ></Map> */}
          </>{" "}
          <center>
            <div>
              <h2
                style={{
                  fontSize: "4rem",
                  lineHeight: "1.2",
                  color: "#6A1B9A",
                }}
                className={classes.title}
              >
                Location
              </h2>
              {Event.premise && (
                <>
                  {" "}
                  <h5
                    style={{ fontSize: "1.9rem", lineHeight: "1.2" }}
                    className={classes.description}
                  >
                    {Event.premise}
                  </h5>
                </>
              )}
              <h5
                style={{ fontSize: "1.3rem", lineHeight: "1.2" }}
                className={classes.description}
              >
                {Event.address}
              </h5>
            </div>
          </center>
          <h1
            style={{
              fontSize: "10rem",
              color: "#E1BEE7",
              marginTop: "-3opx",
              marginBottom: "-30px",
            }}
            className={classes.title}
          >
            Tickets
          </h1>
          <div style={{ padding: "5px", margin: "10px" }}>
            <Tickets />
          </div>
          <div style={{ marginTop: "-1100px" }}>
            <div
              style={{
                width: "1000px",
                overflow: "hidden",
                marginTop: "-300px",
                paddingTop: "-100px",
              }}
            >
              <h1
                style={{
                  fontSize: "4rem",
                  color: "#E1BEE7",

                  marginBottom: "-30px",
                }}
                className={classes.title}
              >
                Share this Event
              </h1>
              <ShareSocial
                url={
                  "http://localhost:3001/event/60ff0f181b81bd494016803c/" +
                  localStorage.getItem("id")
                }
                style={styleBox}
                socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
              />
            </div>

            <WorkSection />
            <TeamSection />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default LandingPage;
