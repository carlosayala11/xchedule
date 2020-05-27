
import React, {Component} from 'react';
import NavigationBar from "../components/NavigationBar";
import '../styles/AllAppointments.css'
import {Button, Card, CardTitle} from 'reactstrap';
import axios from 'axios'
import {Redirect} from "react-router-dom";
import * as firebase from "firebase";



class ViewCanceledAppointments extends Component{
    constructor(){
        super();
        this.state={
            results: [],
            data: '',
            rescheduleSelected:false,
            loggedIn:true
        }
        this.passIDs = this.passIDs.bind(this)

    }

    componentDidMount(){
        this.getCanceledAppointments();
      }

    getCanceledAppointments = () =>{
        firebase.auth().onAuthStateChanged((user) =>{
        if (user) {
        var id = firebase.auth().currentUser.uid;
        console.log(id);
        axios.get(`https://xchedule-api.herokuapp.com/appointments/canceled`, {
            params: {
                id: id
            }
        })
          .then(res => {
            console.log(res.data)
            this.setState({
              data: res.data.Appointments
            })
          })
      } else {
        // No user is signed in.
        console.log("No user logged in.")
        this.setState({loggedIn:false})

        }
        });
      }

    passIDs(aid, sid){
        console.log(aid)
        console.log(sid)
        sessionStorage.setItem('aid', aid)
        sessionStorage.setItem('sid', sid)
        this.setState({rescheduleSelected:true})

    }


    render(){
        if(!this.state.loggedIn){
            return <Redirect to="/login"/>
        }
        if(this.state.rescheduleSelected){
            return(
                <Redirect to="/appointment/reschedule"/>
            )
        }

        const appointments = Array.from(this.state.data);
        const listItems = appointments.map((appointment) =>
            <Card key={appointment.aid}>
                <CardTitle></CardTitle>
                <p className="working-hours">Service Type:</p>
                <p className="hours">{appointment.serviceType}</p>
                <p className="working-hours">Appointment Time:</p>
                <p className="hours">{appointment.startDate}</p>
                <p className="hours">{appointment.endDate}</p>
                <Button onClick={() => this.passIDs(appointment.aid, appointment.sid)}>Re-schedule</Button>
            </Card>
        );

        return(
            <div className='all-appointments-page'>
                <NavigationBar></NavigationBar>
                <div className="cards-container">
                    {listItems}
                </div>
            </div>
        )
    }

}


export default ViewCanceledAppointments;