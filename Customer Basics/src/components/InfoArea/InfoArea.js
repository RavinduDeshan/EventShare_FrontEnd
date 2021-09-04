import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/components/infoStyle.js";

const useStyles = makeStyles(styles);

export default function InfoArea(props) {
  const classes = useStyles();
  const { title, description, iconColor, vertical, time } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical,
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical,
  });
  return (
    <div style={{ margin: -5 }} className={classes.infoArea}>
      <div className={iconWrapper}>
        {/* <props.icon style={{ marginTop: 10 }} className={iconClasses} /> */}
      </div>
      <div className={classes.descriptionWrapper}>
        <h1
          style={{ fontSize: "3rem", marginBottom: -4, color: "#BA68C8" }}
          className={classes.title}
        >
          {title}
        </h1>
        <h2
          style={{ color: "gray", fontSize: "3rem", marginTop: -2 }}
          className={classes.title}
        >
          {description}
        </h2>
        {/* <p style={{ color: "purple" }} className={classes.description}>
         
          {time}
        </p> */}
      </div>
    </div>
  );
}

InfoArea.defaultProps = {
  iconColor: "gray",
};

InfoArea.propTypes = {
  icon: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  vertical: PropTypes.bool,
};
