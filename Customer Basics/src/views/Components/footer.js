import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer style={{ padding: "50px", backgroundColor: "#E1F5FE" }}>
        <div className={"container-fluid padding"}>
          <div class={"row text-center"}>
            <div class="col-md-4">
              <h1>
                <img
                  style={{ width: "300px" }}
                  src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
                />
              </h1>

              <p>Your Event Planner</p>
              <p>Your Best Quality Event Planner.</p>
            </div>

            <div className="col-md-4" id={"footabout"}>
              <h3>About</h3>

              <p>Event Planner Pvt Ltd</p>
              <p>We Serve Best Quality.</p>
              <p>Choose us.</p>
            </div>

            <div className="col-md-4">
              <h3>Contact</h3>

              <p>071 400 9186</p>
              <p>501/A , Malabe</p>
              <p>Sri Lanka</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
