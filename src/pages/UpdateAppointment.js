import React, {Component} from 'react';
import UpdateAppointmentForm from '../components/UpdateAppointmentForm'
import NavigationBar from '../components/NavigationBar'
//import { Button } from 'reactstrap';
import '../styles/Appointment.css'
//import logo_white from '../logo_white.png'
//import logo_black from '../logo_black.png'

class UpdateAppointment extends Component{
    constructor(){
        super();
        this.state={
        }

    }

    renderForm(){
        return(
            <UpdateAppointmentForm></UpdateAppointmentForm>
        )
    }


    render(){
        return(
            <div className='appointment-page'>
                {/* <img src={logo_black} className="logo"/> */}
                <NavigationBar></NavigationBar>
                {/* <h1>Create New Appointment</h1> */}
                {this.renderForm()}
            </div>
        )
    }
}

export default UpdateAppointment;