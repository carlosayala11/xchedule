import React, {Component} from 'react';
import AppointmentForm from '../components/AppointmentForm'
import NavigationBar from '../components/NavigationBar'
//import { Button } from 'reactstrap';
import '../styles/Appointment.css'
//import logo_white from '../logo_white.png'
//import logo_black from '../logo_black.png'
import {Redirect} from 'react-router-dom'
import * as firebase from 'firebase'


class Appointment extends Component{
    constructor(){
        super();
        this.state={
            loggedIn:true
        }
        
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              
            } else {
                console.log("no user")
                this.setState({loggedIn:false})

              // No user is signed in.
            }
          });
    }

    renderForm(){
        return(   
            <AppointmentForm></AppointmentForm>
        )
    }


    render(){
        if(!this.state.loggedIn){
            return <Redirect to="/login"/>
        }
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

export default Appointment;