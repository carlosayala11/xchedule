import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from 'axios';
import * as firebase from 'firebase';

class Calendar extends Component{
  constructor(){
    super();
    this.state={
      //holds data of all appointments
      data:[
        { startDate: '2018-11-01T09:45:00', endDate: '2018-11-01T11:20:49'},
        { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' }
      ],
      //decides if the calendar should be rendered or not
      renderCalendar:false
    }
  }

  //Called when component loads on page
  componentDidMount(){
    this.getUserAppointments()
  }

  //function to conditionally render the calendar or a message
  renderCalendar(data){
    const currentDate = '2018-11-01';

    //if the calendar is supposed to be rendered (has appointments available to show), render it
    if(this.state.renderCalendar){
      return(
        <Paper>
          <Scheduler data={data}>
            <ViewState
              currentDate={currentDate}
            />
            <DayView
              startDayHour={9}
              endDayHour={18}
            />
            <Appointments />
          </Scheduler>
        </Paper>
      )}else{
        return <p>NO DATA TO SHOW</p>
      }
  }

  //function to get appointments from DB
  getUserAppointments(){
    //check if a user is signed in
    firebase.auth().onAuthStateChanged((user) =>{
      if (true) {
        // User is signed in.  get their appointments
        axios.get('http://localhost:5000/appointments').then((res)=>{
          //change data to hold the appointment data, calendar should be rendered to change that state too
          //this.setState({data:res.data.AppointmentsList)
          this.setState({renderCalendar:true})

          console.log(this.state.data)
        }).catch((err)=>{
          console.log(err)
      })
      } else {
        // No user is signed in.
        console.log("No user logged in.")
      }
    });
  }
  

  render(){
    //conditionally render the calendar
    return(
      <div>
        {this.renderCalendar(this.state.data)}
      </div>
    )}
}


export default Calendar;