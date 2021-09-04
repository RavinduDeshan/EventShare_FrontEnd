import React, { useEffect, useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "reactstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import Review from "./Review";
import { multiStepContext } from "./StepContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: "scroll",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1599739291060-4578e77dac5d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const steps = ["Company's Basic Details", "Company's Contact Details"];

export default function UpgradeUser(props) {
  const classes = useStyles();

  console.log("Username main", localStorage.getItem("username"));

  const { currentStep, userSData } = useContext(multiStepContext);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FirstStep />;
      case 1:
        return <SecondStep />;

      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={5} className={classes.image} />

      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <CssBaseline />

          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <center>
                {" "}
                <a class="navbar-brand">
                  <img
                    style={{ width: "300px" }}
                    src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
                  />{" "}
                </a>
              </center>
              <Typography component="h1" variant="h4" align="center">
                Upgrade to a Hosting Account
              </Typography>
              <br />
              <Stepper activeStep={currentStep} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {currentStep === steps.length ? (
                  <React.Fragment>
                    <center>
                      <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                      </Typography>
                      <Typography variant="subtitle1">
                        Your order number is #2001539. We have emailed your
                        order confirmation, and will send you an update when
                        your order has shipped.
                      </Typography>
                    </center>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(currentStep)}
                    {/* <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div> */}
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </main>
        </div>
      </Grid>
    </Grid>
  );
}
