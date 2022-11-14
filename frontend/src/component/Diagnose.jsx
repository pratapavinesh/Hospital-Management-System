import React, { Component } from 'react';
import im from '../assest/136920.jpg'
import Logo from './Logo'
import {
  Box,
  Button,
  Form,
  TextArea,
  Grommet
} from 'grommet';
import '../App.css';
const theme = {
  global: {
    colors: {
      brand: '#000000',
      focus: "#000000",
      active: "#000000",
    },
    font: {
      family: 'Lato',
    },
  },
};
var diagnosis;
var prescription;
var id;
const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    style={{ zIndex: '1'}}
    {...props} />
);

const DiagnosisTextArea = () => {
  const [value, setValue] = React.useState("");

  const onChange = event => {
    setValue(event.target.value);
    diagnosis = event.target.value;
  };

  return (
    <Grommet theme={theme}>
      <h4>Diagnosis</h4>
      <TextArea
         style={{width:"50vw", height:"12vw",backgroundColor:"#FFFFFF", color:"#000000",opacity:0.5}}
        placeholder="Enter Diagnosis"
        label="Enter Diagnosis"
        value={value}
        onChange={onChange} fill
        required />
    </Grommet>
  );
};

const PrescriptionTextArea = () => {
  const [value, setValue] = React.useState("");
  const onChange = event => {
    setValue(event.target.value);
    prescription = event.target.value;
  };
  return (
    <Grommet theme={theme}>
        <h4>Prescription</h4>
        <TextArea
          placeholder="Enter Prescription"
          label="Enter Prescription"
          value={value}
          style={{width:"50vw", height:"12vw",backgroundColor:"#FFFFFF", color:"#000000",opacity:0.5}}
          onChange={onChange} fill
          required />
    </Grommet>
  );
};

export class Diagnose extends Component {
  constructor(props) {
    super(props);
    id = props.match.params.id;
  }
  render() {
    return (
      <div className ='main'>
       <img src={im} alt="image_alternauhsddv"></img>
      <div className="content">
      <Grommet theme={theme} full>
        <AppBar>
        <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Logo></Logo></a>
        </AppBar>
        <Box align="center" gap="small">
          <Form
            onSubmit={({ value }) => {
              fetch("http://localhost:3001/diagnose?diagnosis=" + diagnosis + "&prescription=" + prescription
              + "&id=" + id).then(()=>{
              })
              window.alert("Diagnosis Submitted!");
            }}
          >
            <DiagnosisTextArea />
            <PrescriptionTextArea />
            <br />
            <Box align="center">
            <Button
              label="Submit Diagnosis"
              type="submit"
              primary
            />
            </Box>
          </Form>
        </Box>
      </Grommet>
      </div>
      </div>
    );
  }
}
export default Diagnose;