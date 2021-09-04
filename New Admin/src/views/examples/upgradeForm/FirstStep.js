import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
  Badge,
} from "reactstrap";
import Uploader from "../../Cards/uploader";
import { multiStepContext } from "./StepContext";
import NativeSelectInput from "@material-ui/core/NativeSelect/NativeSelectInput";

export default function FirstStep(props) {
  const { setStep, userFData, setFData } = useContext(multiStepContext);

  const [name, setName] = useState(userFData.name ? userFData.name : "");
  const [category, setCat] = useState(
    userFData.category ? userFData.category : ""
  );
  const [nic, setNIC] = useState(userFData.nic ? userFData.nic : "");
  const [role, setRole] = useState(userFData.role ? userFData.role : "");
  const [note, setNote] = useState(userFData.note ? userFData.note : "");
  const [file, setFile] = useState(userFData.file ? userFData.file : null);

  const [nameError, setNameError] = useState("");
  const [categoryError, categorysetError] = useState("");
  const [nicError, nicsetError] = useState("");
  const [roleError, rolesetError] = useState("");
  const [fileError, filesetError] = useState("");
  const [noteError, notesetNameError] = useState("");

  let nameE = false;
  let categoryE = false;
  let nicE = false;
  let roleE = false;
  let noteE = false;
  let fileE = false;

  const handleNext = () => {
    setFile(userFData.file ? userFData.file : null);
    // added
    // setFData({...userFData, name:name , category:category, role:role, nic:nic, note:note });

    if (name === "") {
      nameE = true;

      setNameError("e");
    }

    if (category == "") {
      categoryE = true;

      categorysetError("e");
    }

    if (nic == "") {
      nicE = true;
      nicsetError("Please Enter your NIC Number");
    } else {
      var re = new RegExp("^[0-9]{9}[V]$");
      if (!re.test(nic)) {
        nicE = true;
        nicsetError("NIC format is incorrect. Ex : 9XXXXXXXV");
      }
    }

    if (role == "") {
      roleE = true;
      rolesetError("e");
    }

    if (note == "") {
      noteE = true;
      notesetNameError("e");
    }

    if (file == "" || file === null) {
      fileE = true;
      filesetError("Please upload an image file");
    }

    console.log("name E", nameE);
    console.log("r E", roleE);
    console.log("nic E", nicE);
    console.log("cat E", categoryE);
    console.log("note E", noteE);
    console.log("file E", fileE);

    if (!nameE && !roleE && !nicE && !categoryE && !noteE && !fileE) {
      setFData({
        ...userFData,
        name: name,
        category: category,
        role: role,
        nic: nic,
        note: note,
      });
      setStep(1);
    }
  };

  // const [sfirstName, ssetFirstName] = useState('');
  // const [slastName, ssetLastame] = useState('');
  // const [susername, ssetUsername] = useState('');
  // const [semail, ssetEmail] = useState('');
  // const [saddress, ssetAddress] = useState('');
  // const [smobile, ssetMobile] = useState('');
  // const [scity, ssetCity] = useState('');
  // const [sprovince, ssetProvince] = useState('');
  // const [snote, ssetNote] = useState('');

  return (
    <React.Fragment>
      <Form>
        <h6 className="heading-small text-muted mb-4">Company Details</h6>
        <div className="pl-lg-4">
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-username">
                  Company Name
                </label>{" "}
                {nameError && (
                  <Badge style={{ marginLeft: "10px" }} color="warning">
                    Please Enter the Company Name
                  </Badge>
                )}
                <Input
                  className="form-control-alternative"
                  id="input-username"
                  placeholder="Event Hosting Organization"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-email">
                  Company Category
                </label>{" "}
                {categoryError && (
                  <Badge style={{ marginLeft: "10px" }} color="warning">
                    Please Select a Company Category
                  </Badge>
                )}
                <Input
                  className="form-control-alternative"
                  id="input-email"
                  value={category}
                  onChange={(e) => {
                    setCat(e.target.value);
                    categorysetError("");
                  }}
                  type="select"
                >
                  <option value="Entertainment">Entertainment</option>
                  <option value="Media">Media</option>
                  <option value="Government">Government</option>
                  <option value="School Society / Association">
                    School Society / Association
                  </option>
                  <option value="other">other</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </div>

        <hr className="my-4" />
        {/* Address */}
        <h6 className="heading-small text-muted mb-4">
          Your Professional Details
        </h6>
        <div className="pl-lg-4">
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-username">
                  Your NIC
                </label>{" "}
                {nicError && (
                  <Badge style={{ marginLeft: "10px" }} color="warning">
                    {nicError}
                  </Badge>
                )}
                <Input
                  className="form-control-alternative"
                  id="input-username"
                  placeholder="Event Hosting Organization"
                  type="text"
                  value={nic}
                  onChange={(e) => {
                    setNIC(e.target.value);
                    nicsetError("");
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-email">
                  Your Role
                </label>{" "}
                {roleError && (
                  <Badge style={{ marginLeft: "10px" }} color="warning">
                    Please Select your role
                  </Badge>
                )}
                <Input
                  className="form-control-alternative"
                  id="input-email"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    rolesetError("");
                  }}
                  type="select"
                >
                  <option value="Entertainment">Event Manager</option>
                  <option value="Media">CEO</option>
                  <option value="Government">Developer</option>
                  <option value="School Society / Association">Intern</option>
                  <option value="other">other</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </div>

        <hr className="my-4" />
        {/* Address */}
        <h6 className="heading-small text-muted mb-4">Company Logo</h6>
        <div className="pl-lg-4">
          <Row>
            <Col lg="12">
              <FormGroup>
                <Uploader
                  title="Upload your company logo"
                  subtitle="Drag a file to attach or browse"
                  iconName="fas fa-file-upload"
                  error={fileError}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>

        <hr className="my-4" />
        {/* Description */}
        <h6 className="heading-small text-muted mb-4">About Your Company</h6>
        <div className="pl-lg-4">
          <FormGroup>
            <label>Company Description</label>{" "}
            {noteError && (
              <Badge style={{ marginLeft: "10px" }} color="warning">
                This field can not be empty
              </Badge>
            )}
            <Input
              className="form-control-alternative"
              placeholder="A few words about your company ..."
              rows="4"
              type="textarea"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                notesetNameError("");
              }}
            />
          </FormGroup>
          <hr className="my-4" />

          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
}
