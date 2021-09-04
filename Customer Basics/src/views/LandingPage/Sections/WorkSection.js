import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Swal from "sweetalert2";
import InfoArea from "components/InfoArea/InfoArea.js";
import { Card, Feed } from "semantic-ui-react";
import InfoIcon from "@material-ui/icons/Info";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import ReactStars from "react-rating-stars-component";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const { id } = useParams();
  const classes = useStyles();
  const [rate, setRating] = useState("");

  const ratingChanged = (newRating) => {
    const uid = localStorage.getItem("id");
    if (uid) {
      console.log(newRating);
      setRating(newRating);

      const token = localStorage.getItem("token");

      let newRate = { uid: uid, score: rate };
      axios
        .post(
          `http://localhost:443/event/rate/` + id,
          {
            headers: {
              token: token,
            },
          },
          newRate
        )
        .then((res) => {
          let warning = res.data.warn;

          if (warning !== null && warning !== undefined) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: warning,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Thank You!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {});
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "You need to be logged in to ate events",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Review the Event</h2>

          <div style={{ marginTop: "-50px", marginLeft: "150px" }}>
            <center>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={100}
                activeColor="#BA68C8"
              />
            </center>
          </div>

          <h4 className={classes.description}>
            Divide details about your product or agency work into parts. Write a
            few lines about each one and contact us about any further
            collaboration. We will responde get back to you in a couple of
            hours.
          </h4>

          {/* reviews */}
          <h2 className={classes.title}>User Reviews</h2>

          <div style={{ color: "black" }}>
            <Card>
              <Card.Content></Card.Content>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                    <Feed.Content>
                      <Feed.Date content="1 day ago" />

                      <Feed.Summary>
                        <h2> Ycoworker</h2>
                      </Feed.Summary>
                      <Feed.Summary>
                        You added <a>Jenny Hess</a> to your <a>coworker</a>{" "}
                        group.
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
          </div>
          {/*  */}

          <h2 className={classes.title}>Add your Reviews</h2>

          <form>
            <GridContainer>
              <CustomInput
                labelText="Your Comment"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea,
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary">Post</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
