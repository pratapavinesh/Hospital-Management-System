import React, { Component} from 'react';
import im from '../assest/136920.jpg'
import Logo from './Logo.jsx'
import {
    Box,
    Button,
    Grommet,
} from 'grommet';

import '../App.css';

const theme = {
    global: {
      colors: {
        brand: '#000000',
        focus: '#000000'
      },
      font: {
        family: 'Lato',
      },
    },
  };

export class DocViewAppt extends Component {
    state = { apptlist: [] }

    componentDidMount() {
        this.getNames();
    }

    getNames() {
        fetch('http://localhost:3001/doctorViewAppt')
        .then(res => res.json())
        .then(res => this.setState({ apptlist: res.data }));
    }

    render() {
        const { apptlist } = this.state;
        const Header = () => (
            <Box
                tag='header'
                background='brand'
                pad='small'
                elevation='small'
                justify='between'
                direction='row'
                align='center'
                flex={false}
            >
                <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Logo></Logo></a>
            </Box>
        );

        const Body = () => (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>Concerns</th>
                                <th>Symptoms</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apptlist.map(appt =>
                                <tr key={appt.name}>
                                    <td>{appt.id}</td>
                                    <td>{appt.name}</td>
                                    <td>{new Date(appt.date).toLocaleDateString().substring(0,10)} </td>
                                    <td>{appt.starttime}</td>
                                    <td>{appt.concerns}</td>
                                    <td>{appt.symptoms}</td>
                                    <td>{appt.status}</td>
                                    <td>
                                        <Button label="Diagnose"
                                          style={{color:'#FFFFFF',backgroundColor:'#000000'}}
                                        href={`/Diagnose/${appt.id}`}
                                        ></Button>     
                                    </td> 
                                    <td>
                                        {appt.status === "NotDone"?
                                            <Button label="Cancel"
                                            style={{color:'#FFFFFF',backgroundColor:'#000000'}}
                                            onClick = {() => {
                                                fetch('http://localhost:3001/deleteAppt?uid='+ appt.id)
                                                window.location.reload();
                                            }}
                                            ></Button>
                                        :<div></div>}
                                    </td> 
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        );
        return (
            <div className ='main'>
     <img src={im} alt="image_alternate"></img>
    <div className="content">
            <Grommet full={true}
            theme = {theme}>
                <Header />
                <Box fill={true}>
                    <Body />
                </Box>
            </Grommet>
            </div>
            </div>
        );
    }
}

export default DocViewAppt;