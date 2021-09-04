import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect, useState , useContext} from "react";
import {useParams} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import config from '../../../configure'
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal
} from "reactstrap";
import {multiStepContext} from './StepContext'


export default function SecondStep(props) {


const {setStep , userFData, setFData ,userSData, setSData} = useContext(multiStepContext);
  


  const [email, setEmail] = useState(userFData.email?userFData.email:"");
  const [countries, setCountries] = useState([]);
 
  const [address, setAddress] = useState(userFData.address?userFData.address:"");
  const [mobile, setMobile] = useState(userFData.mobile?userFData.mobile:"");
  const [city, setCity] = useState(userFData.city?userFData.city:"");
  const [province, setProvince] = useState(userFData.province?userFData.province:"");
  const [country, setCountry] = useState(userFData.country?userFData.country:"");
  const [url, setURL] = useState(userFData.url?userFData.url:"");
  const [cCode, setCode] = useState(userFData.cCode?userFData.cCode:"");

  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [cityError, setCityError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [countryError, setCountryError] = useState("");
 

   let emailE=false;
   let addressE=false;
   let mobileE=false;
   let cityE=false;
   let provinceE=false;
   let countryE=false;
  

  const  getCodeCountryCode = async(country)=>{

    if(country){

      await axios.get(`https://restcountries.eu/rest/v2/name/`+country).
    then((res) => {

   

      

        let code =  res.data[0].callingCodes[0];

     

        setCode(code);
      



       

        

          




        }
    ).catch((err) => {

        console.log("Error", err);

        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error Occured During Code Validation.Please try again',
            showConfirmButton: false,
            timer: 3000
        })

           return false;
    });
    }else{

              countryE=true;
              setCountryError("Please select a country");


    }

    




  }
  const submit = async(URLProp)=>{

    console.log("url in submit:", URLProp);

    let Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
            onBeforeOpen: () => {
                Swal.showLoading()
            }


        });

        console.log("username", localStorage.getItem("username"));

        const Entry = {

            userId : localStorage.getItem("id"),
            username : localStorage.getItem("username"),
            companyDescription : userFData.note,
            companyMobile : cCode+mobile,
            companyImg : URLProp?URLProp:url,
            companyCity : city,
            company : userFData.name,
            category : userFData.category,
            designation : userFData.role,
            companyEmail : email,
            companyAddress : address,
            nic : userFData.nic


          


        }


       
       axios.post(`http://${config.host}:${config.port}/host/add`, Entry, {

          
            onUploadProgress: ProgressEvent => {

               let timer2 =10000;

               timer2 = 100 - parseInt((Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                console.log("percentage inside ", timer2);

                Toast.fire({
                    icon: 'info',
                    title: 'Uploading on Progress.',
                    text: 'Please wait a moment',


                })

                setTimeout(() => timer2 = 0, 1000)


            }


        }).then(
            (res) => {


                const warning = res.data.warn;

                if (warning !== null && warning !== undefined) {

                    console.log("message is", warning);

                    Swal.fire({
                        position: 'center',
                        icon: 'info',
                        title: 'Please Try Again',
                        text: warning,
                        showConfirmButton: false,
                        timer: 3000
                    });


                } else {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Account Successfully Upgraded',
                        showConfirmButton: false,
                        timer: 3000
                    });

                 window.location="http://localhost:3000/host/settings/";

                }


            }
        ).catch((err) => {

          console.log(err);

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error Occured.Please try again',
                showConfirmButton: false,
                timer: 3000
            })
        });


  }

  const upload=async()=>{

   let timer=10000;


        let Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
            onBeforeOpen: () => {
                Swal.showLoading()
            }


        })
        


        const formData = new FormData();

        formData.append('img', userFData.file);


  

        await axios.post(`http://${config.host}:${config.port}/host/upload`, formData, {

            
            onUploadProgress: ProgressEvent => {

               timer= 100 - parseInt((Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                console.log("percentage inside ", timer);

                Toast.fire({
                    icon: 'info',
                    title: 'Uploading on Progress.',
                    text: 'Please wait a moment',


                })

                setTimeout(() => timer= 0, 1000)


            }


        }).then((res) => {

            console.log("response is: ", res.data);

            if (res.data.URL) {

              setURL(res.data.URL);

              console.log("url in res:", res.data.URL);
               console.log("url in states:", url);

                
                submit(res.data.URL);


            }
            if (res.data.msg) {
                Swal.fire({
                    title: "Upload Interrupted",
                    text: res.data.msg,
                    icon: "error",

                    dangerMode: true,
                })


            }

        }).catch((err => {

            

         

                Swal.fire({
                    title: "Process Interrupted",
                    text: "Server Error ",
                    icon: "error",

                    dangerMode: true,
                })

           


        }))
  }




  const  handleBack =()=>{

    setFData({...userFData, email:email , address:address, mobile:mobile, city:city, province:province, country:country });
    setStep(0);


  }

   const  handleFinish =async()=>{

    if(await validate()){

     await setFData({...userFData, email:email , address:address, mobile:mobile, city:city, province:province, country:country, url:url })

       if(!url){

         upload();

      }else{
        submit();
      }
       

     
     


    

    }else{
       console.log("error");

    }





   }

   const  validate = async()=>{


    
    if(email===""){

    

        emailE=true;

        setEmailError("Please enter your companie's email ");

     


    }else{

      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        emailE=true;
          setEmailError("Please enter a valid email!");
    } 



    }

     if(address==''){


          addressE=true;

          setAddressError("Please enter your companie's Address ");
     

    }

    

     if(mobile==''){

      console.log("val",mobile);

       

       mobileE=true;
        setMobileError("Please Enter Hotline number");

     

    }else{

       console.log("val",mobile);

     
      var re = new RegExp("^[0-9]{9}$");
      if (!re.test(mobile)) {
         mobileE=true;
        setMobileError("Number format is incorrect. Ex : 7XXXXXXXX");
    } 

  }

    
     if(city==''){

          cityE=true;
          setCityError("Please Enter the city");

      

    }



     if(province==''){

        provinceE=true;
        setProvinceError("Please Enter the province");

      

    }

    if(country==''){

        countryE=true;
        setCountryError("Please select a country");

      
      
    }

  

    

      

   
   

    if((!emailE) && (!addressE) && (!mobileE) && (!cityE) && (!provinceE) && (!countryE)){

      setFData({...userFData, email:email , address:address, mobile:mobile, city:city, province:province, country:country });
      
      return true;
    }
  
      return false;
   




   }

  const  getCountries =async()=>{

   await axios.get("https://restcountries.eu/rest/v2/all").
    then((res) => {

   

      

           setCountries(res.data);



        }
    ).catch((err) => {

        console.log("Error", err);

        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error Occured During Loadin Countries.Please try again',
            showConfirmButton: false,
            timer: 3000
        })
    });


  

  }

  

  useEffect(()=>{
    

  getCountries();

 

  },[]);

  return (
    <React.Fragment>

 
     <Form>
                  <h6 className="heading-small text-muted mb-4">
                   Company's Contact Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                           Company's Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Company Email"
                            type="email"
                            
                         
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value); setEmailError('')}}
                          />

                          {emailError && <Badge style={{marginTop:"10px"}} color="warning">{emailError}</Badge>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                           Company Hotline ( without country code )     {cCode && <Badge style={{marginLeft:"10px",marginBottom:"-5px", fontSize:"13px"}} color="primary">{"Coutry Code: "+"+"+cCode}</Badge>}

                          </label>
                        {/* <PhoneInput
                        
                            country={'lk'}  
                            
                             value={mobile}
                            onChange={(e)=>
                              {setMobile(e); setMobileError(''); setCountryError('');}}
                          /> */}


                           <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Company Hotmail"
                            type="text"
                            
                         
                            value={mobile}
                            onChange={(e)=>{setMobile(e.target.value); setMobileError('');}}
                          />
                          {mobileError && <Badge style={{marginTop:"10px"}} color="warning">{mobileError}</Badge>}
                     
                        </FormGroup>
                      </Col>
                    </Row>
                    </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Company Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address Line
                          </label>{addressError && <Badge style={{marginLeft:"10px"}} color="warning">{addressError}</Badge>}
                          <Input
                            className="form-control-alternative"
                           
                            id="input-address"
                            placeholder="Company Address"
                            type="text"
                         
                            value={address}
                            onChange={(e)=>{setAddress(e.target.value); setAddressError('');}}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>{cityError && <Badge style={{marginLeft:"10px"}} color="warning">{cityError}</Badge>}
                          <Input
                            className="form-control-alternative"
                         
                            id="input-city"
                            placeholder="City"
                            type="text"
                           
                            value={city}
                            onChange={(e)=>{setCity(e.target.value); setCityError('');}}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Province
                          </label>{provinceError && <Badge style={{marginLeft:"10px"}} color="warning">{provinceError}</Badge>}
                          <Input
                            className="form-control-alternative"
                           
                            id="input-country"
                            placeholder="Province"
                            type="text"
                          
                            value={province}
                            onChange={(e)=>{setProvince(e.target.value); setProvinceError('')}}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                          
                            value={country}
                         
                           onChange={(e)=>{setCountry(e.target.value); getCodeCountryCode(e.target.value); setCountryError(''); }}
                          
                            type="select"
                          >{
                            countries.map((country)=>{

                        

                            return  <option value={country.name}>{country.name}</option>

                            })
                          }
                                        
                                      

                          </Input>

                          {countryError && <Badge style={{marginTop:"10px"}} color="warning">{countryError}</Badge>}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                
                  <div className="pl-lg-4">
                   


                          <div>
         <Button onClick={()=>handleBack()}> Back </Button>
       
        <Button onClick={()=>handleFinish()} variant="contained" color="primary" 

         
          >
         Finish
        </Button>
      </div>


                       </div>
                </Form>

              
            </React.Fragment>
 )
}