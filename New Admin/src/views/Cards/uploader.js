import React, { useState , useRef, useContext}  from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Badge } from "reactstrap";
import { BorderColor } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import './uploader.css';
import {multiStepContext} from '../examples/upgradeForm/StepContext'

import { Button } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow:'scroll'
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1599739291060-4578e77dac5d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
   
    display: 'flex',
    flexDirection: 'column',
    padding:'2rem',
    
    
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const Container = styled.div`
  position: relative;
  background-image: white;
  border-radius: 8px 8px 10px 10px;
  
  display: flex;
  align-items: center;
  justify-content: center;
 width: 100%;
 
  background-position: center center;
`;

const Content = styled.div`
  border: 2px dashed #dbe0e6;
  border-spacing: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
   padding: 30px;
`;

const ContentColumn = styled.div`
  text-align: center;
`;

const Title = styled.span`
  font-size: 18px;
  display: block;
  margin-top: 8px;
  margin-bottom: 8px;
  color: ${props => props.color};
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: ${props => props.color};
`;

const IconContainer = styled.div`
  color: ${props => props.color};
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  max-height: 4rem;
  margin-bottom: 20px;
`;






const Uploader = ({
  title,
  titleColor = "#43484D",
  subtitle,
  subtitleColor = "#a2abb3",
  iconName,
  iconSize = 3,
  iconColor = "#43484d",
  error
}) => {

  const fileSize = (size) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
  

    const {userFData, setFData } = useContext(multiStepContext);
  
    const [selectedFile, setSelectedFile] = useState(userFData.file);

      
    const [divColor, setDivColor] = useState(selectedFile?"#E1F5FE":"#FAFAFA");
      
    const [selectedSize, setSelectedSize] = useState(selectedFile?fileSize(userFData.file.size):'');

    const [errorMessage, setErrorMessage] = useState('');

    const modalImageRef = useRef();
    const modalRef = useRef();


const openImageModal = (file) => {

  const reader = new FileReader();
  modalRef.current.style.display = "block";
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
}

}

const closeModal = () => {
    modalRef.current.style.display = "none";
    modalImageRef.current.style.backgroundImage = 'none';
}



    
const handleFile = (file) => {

  if(validateFile(file)){
    if(validateFileSize(file)){

    setErrorMessage(null);
    setSelectedFile(file);
    setFData({...userFData,file:file});
    setSelectedSize(fileSize(file.size));
    setDivColor("#E1F5FE")

    }else{
      setSelectedFile(null);
    setErrorMessage('Files above 3MB is not permitted');
     setDivColor("#FCE4EC")

    }

  }else{
    setSelectedFile(null);
    file['invalid'] = true;
    setErrorMessage('File type not permitted, Upload an Image File!');
    setDivColor("#FCE4EC")
  }


}

const validateFile = (file) => {

   
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
        return false;
    }
    return true;
}

const validateFileSize = (file) => {

    if(file.size>3000000){
      return false;
    }

    return true;
    
}

const dragOver = (e) => {
    e.preventDefault();
}

const dragEnter = (e) => {
    e.preventDefault();
}

const dragLeave = (e) => {
    e.preventDefault();
}

const fileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log(file);
    handleFile(file)
}

  
  return (

  <div
    onDragOver={dragOver}
    onDragEnter={dragEnter}
    onDragLeave={dragLeave}
    onDrop={fileDrop}
  
  >
  <Container>
    <Content style={{backgroundColor: divColor}}>
      <ContentColumn>
        {!selectedFile && (
          <IconContainer color={iconColor}>
            <i className={`${iconName} fa-${iconSize}x`} />
          </IconContainer>
        )}

        {selectedFile && (
          // <ImageContainer onClick={()=>openImageModal(selectedFile)}>
          //   <i className={`${iconName} fa-${iconSize}x`} >View</i>
          // </ImageContainer>
          <Button onClick={()=>openImageModal(selectedFile)} className="btn-icon btn-3" color="info" type="button">
          <span className="btn-inner--icon">
            <i className="ni ni-cloud-upload-96" />
          </span>
          <span className="btn-inner--text">Show Uploaded Logo</span>
        </Button>
        )}
        {(title || subtitle) && (
          <>
            {!selectedFile && <Title color={titleColor}>{title}</Title>}
             {selectedFile && <Title color="#78909C">Drag another image to change the logo</Title>}
            {(!errorMessage && !selectedFile ) && <Subtitle color={subtitleColor}>{subtitle}</Subtitle>}
            
            
             <Badge color="warning" pill>
         {errorMessage}
        </Badge>
        <br/>  <br/>     {(error && !selectedFile) &&     <Badge color="warning" pill>
         {error}
        </Badge> }
       
           {selectedFile && (
             <>
          

          <Badge color="primary" pill style={{margin:"3px"}}>
         {selectedFile.name}
        </Badge>
        <Badge color="info" pill style={{margin:"3px"}}>
         {selectedSize}
        </Badge></>
        )}
         
          </>
        )}
      </ContentColumn>
    </Content>
  </Container>

  <div className="modal" ref={modalRef} onClick={(() => closeModal())}>
    <div className="overlay" ></div>
    <span className="close" onClick={(() => closeModal())}><i class="fa fa-times-circle" aria-hidden="true"></i></span>
    <div className="modal-image" ref={modalImageRef}></div>
  </div>

  </div>
)};

Uploader.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleColor: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string
};

export default Uploader;
