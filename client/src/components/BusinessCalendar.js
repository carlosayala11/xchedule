import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
//import moment from 'moment'

import {
  Scheduler,
  DayView,
  Appointments,
  WeekView,
  ViewSwitcher,
  Toolbar,
  AppointmentTooltip,
  AppointmentForm,
  DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import axios from 'axios';
import * as firebase from 'firebase';
import moment from 'moment'


// supress warning for using moment()
moment.suppressDeprecationWarnings = true;

const mapAppointmentData = appointment => ({
  startDate: appointment.startDate,
  endDate: appointment.endDate,
});

class BusinessCalendar extends Component{
  constructor(){
    super();
    this.state={
      //holds data of all appointments
      // data:[
      //   { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:20'},
      //   { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' }
      // ],
      data: [],
      //decides if the calendar should be rendered or not
      renderCalendar:false,
      loading: true,
    }

    this.getBusinessAppointments = this.getBusinessAppointments.bind(this)
  }

  //Called when component loads on page
  componentDidMount(){
    this.getBusinessAppointments()
  }

  getBusinessAppointments(){
    axios.get("http://localhost:5000/business/1/appointments").then((res)=>{

      this.setState({data:res.data.AppointmentsByBusinessID})
      this.setState({renderCalendar:true})
      console.log(this.state.data)

    }).catch((err)=>{
      console.log(err)
    })
  }

  //function to conditionally render the calendar or a message
  //function to conditionally render the calendar or a message
  renderCalendar(data){
    const currentDate = moment();

    //if the calendar is supposed to be rendered (has appointments available to show), render it
    if(this.state.renderCalendar){
      return(
        <Paper>
          <Scheduler data={data}>
          <ViewState
            defaultCurrentDate={currentDate}
            defaultCurrentViewName="Week"
          />
          <DayView
            startDayHour={9}
            endDayHour={18}
          />
          <WeekView
            startDayHour={9}
            endDayHour={24}
          />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm
            readOnly
          />
          </Scheduler>
        </Paper>
      )}else{
        return <p>NO DATA TO SHOW</p>
      }
  }




  render(){
    // this is the data
    const {data} = this.state.data;
    //console.log('data: ', data);
    // formatted to render in the calendar
    const formattedData = data ? data.map(mapAppointmentData) : [];
    //console.log('formatted: ', formattedData);
    //conditionally render the calendar
    return(
      <div>
        {this.renderCalendar(formattedData)}
      </div>
    )}
}


export default BusinessCalendar;