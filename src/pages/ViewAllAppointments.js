
import React, {Component} from 'react';
import NavigationBar from "../components/NavigationBar";
import '../styles/AllAppointments.css'
import {Button, Card, CardTitle} from 'reactstrap';
import axios from 'axios'
import {Redirect} from "react-router-dom";
import * as firebase from "firebase";



class ViewAllAppointments extends Component{
    constructor(){
        super();
        this.state={
            results: [],
            data: '',
            businessCanceled:false,
            businessCompleted:false,
            businessApproved:false,
            loggedIn:true
        }
        this.cancelAppointment = this.cancelAppointment.bind(this)
        this.completeAppointment = this.completeAppointment.bind(this)
        this.approveAppointment = this.approveAppointment.bind(this)
    }

    componentDidMount(){
        this.getAppointmentsByBusinessId();
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

    getAppointmentsByBusinessId = () => {
        var id = firebase.auth().currentUser.uid;
        console.log(id);
        axios.get('https://xchedule-api.herokuapp.com/business/appointments', {
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
      }
    cancelAppointment(aid){
        console.log(aid)
        axios.get(`https://xchedule-api.herokuapp.com/cancel`, {
            params: {
                id: aid
            }
        })
          .then(res => {
            console.log(res.data)
            this.setState({businessCanceled:true})
          })

    }
    approveAppointment(aid){
        console.log(aid)
        axios.get(`https://xchedule-api.herokuapp.com/approve`, {
            params: {
                id: aid
            }
        })
          .then(res => {
            console.log(res.data)
            this.setState({businessApproved:true})
          })

    }

    completeAppointment(aid){
        console.log(aid)
        axios.get(`https://xchedule-api.herokuapp.com/complete`, {
            params: {
                id: aid
            }
        })
          .then(res => {
            console.log(res.data)
            this.setState({businessCompleted:true})
          })

    }

    render(){
        if(!this.state.loggedIn){
            return <Redirect to="/login"/>
        }
        if(this.state.businessApproved){
            return(
                <Redirect to="/home"/>
            )
        }
        if(this.state.businessCanceled){
            return(
                <Redirect to="/home"/>
            )
        }
        if(this.state.businessCompleted){
            return(
                <Redirect to="/home"/>
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
                <Button onClick={() => this.completeAppointment(appointment.aid)}>Complete</Button>
                <div>
                  {appointment.pending ? (
                   <Button onClick={() => this.approveAppointment(appointment.aid)}>Approve</Button>
                  ) : (
                    <p className="working-hours">Already approved</p>
                  )}
                </div>
                <Button onClick={() => this.approveAppointment(appointment.aid)}>Approve</Button>
                <Button onClick={() => this.cancelAppointment(appointment.aid)}>Cancel</Button>
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


export default ViewAllAppointments;