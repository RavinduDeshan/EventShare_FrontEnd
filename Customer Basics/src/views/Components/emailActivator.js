import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import swal from "sweetalert";
import axios from "axios";
import Nav from "./navbarEmpty";

function PreLoader1() {
  const [data, setData] = useState([]);
  let { id } = useParams();
  const [done, setDone] = useState(undefined);

  //   const getUser = async ()=>{

  //         console.log("id is", id);
  //         axios.get(`http://localhost:443/host/activateEmail/` + id, ).then(res => {

  //             console.log("res is", res);

  //             setData(res.data);

  //         }).catch(err => {
  //             console.log(err);

  //         })

  //   }
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("id", id);
      axios
        .post(`http://localhost:443/host/activateEmail/` + id)
        .then(async (response) => {
          swal({
            title: "Activation Successfull",
            text: "Your email is now activated!",
            icon: "success",
            // buttons: true,
            dangerMode: false,
          });

          window.location = "http://localhost:3001/login/";

          setDone(true);
        })
        .catch(async (err) => {
          if (err) {
            swal({
              title: "Please Try Again",
              text: "Activation Failed!",
              icon: "error",
              // buttons: true,
              dangerMode: true,
            });

            await sleep(5000);
            window.location = "http://localhost:3001/";
          }
        });
    }, 2000);
  }, []);

  return (
    <>
      <Nav />
      <center>
        <div
          style={{ paddingTop: "20rem" }}
          className="wrap-login100 p-t-85 p-b-20"
        >
          <a class="navbar-brand">
            <img
              style={{ width: "300px" }}
              src="https://res.cloudinary.com/fashionistaimage/image/upload/v1618838914/eventsharelogo2_lgqslw.png"
            />{" "}
          </a>
          <span className="login100-form-title ">
            <h2>Activating Account</h2>
          </span>
          {!done ? (
            <ReactLoading
              type={"bubbles"}
              color={"#AB47BC"}
              height={200}
              width={200}
            />
          ) : (
            <ul>
              {data.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </div>
      </center>
    </>
  );
}

export default PreLoader1;
