import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import styled from "styled-components";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import ReactStars from "react-rating-stars-component";
const FullStar = () => (
  <StarContainer>
    <i className="fas fa-star" />
  </StarContainer>
);

const HalfStar = () => (
  <StarContainer>
    <i className="fas fa-star-half" />
  </StarContainer>
);

const FullStarGray = () => (
  <StarContainer>
    <i style={{ color: "gray" }} className="fas fa-star" />
  </StarContainer>
);
const useStyles = makeStyles(styles);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const ReviewsContainer = styled.div`
  margin-bottom: 15px;
  font-size: 10px;
  color: #9ca1ae;
  & span:last-child {
    margin-left: 5px;
  }
`;

const StarContainer = styled.span`
  color: #f4d931;
`;
const getMonth = (dateVa) => {
  console.log("=============date undex==============");
  console.log(index);
  console.log("====================================");

  let index = String(dateVa).substring(5, 7);
  let day = months[parseInt(index)];
  return day;
};

const getTime = (time) => {
  let timeReal = parseInt(time);
  if (timeReal > 12) {
    return timeReal - 12;
  } else return timeReal;
};

const getTimePeriod = (time) => {
  let timeReal = parseInt(time);
  if (timeReal > 12) {
    return "PM";
  } else return "AM";
};
export default function ProductSection({
  name,
  description,
  date,
  time,
  rate,
}) {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2
            style={{ fontSize: "4rem", lineHeight: "1.2", color: "#6A1B9A" }}
            className={classes.title}
          >
            {name}
          </h2>
          <h5
            style={{ fontSize: "1.3rem", lineHeight: "1.2" }}
            className={classes.description}
          >
            {description}
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title={getMonth(date) + " " + String(date).substring(8, 10)}
              description={String(date).substring(0, 4)}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title={
                getTime(String(time).substring(0, 2)) +
                " : " +
                String(time).substring(3, 5) +
                " " +
                getTimePeriod(String(time).substring(0, 2))
              }
              description={"ONWARDS"}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <div
              style={{
                marginTop: "30px",
                marginBottom: "-70px",
                paddingLeft: "20px",
              }}
            >
              <ReactStars
                edit={false}
                count={5}
                value={rate}
                size={70}
                activeColor="#BA68C8"
                isHalf={true}
              />
            </div>
            <InfoArea
              title=""
              description={rate ? rate + "/5" : "0" + "/5"}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
