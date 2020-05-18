import React, {Component} from 'react';
import { Button, Input, Label, FormGroup, Form } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import axios from 'axios'
import moment from 'moment'

var firebase = require('firebase');

class AppointmentForm extends Component{
    constructor(){
        super();
        this.state={
            bid:'',
            sid:'',
            date: '',
            start:'',
            end:'',
            duration:'',
            completed:'',
            pending:'',
            canceled:'',
            endDate:'',
            services: [],
            business: []
        };
    }

    getServicesByBusiness = (event) =>{
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        axios.get(`http://localhost:5000/business/${this.state.bid}/services
        `)
      .then(res => {
          console.log(res.data)
        this.setState({
          services: res.data.ServicesByBusinessID
        })
      })
    }
    onInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
  }

    getHours = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        axios.get(`http://localhost:5000/services/business/${this.state.sid}`)
      .then(res => {
          console.log(res.data)
        this.setState({
          start: res.data.BusinessHours.starttime
        })
          this.setState({
          end: res.data.BusinessHours.endtime
        })
      })
    }
    getAllBusiness = () => {
    axios.get(`http://localhost:5000/business`)
      .then(res => {
          console.log(res.data)
        this.setState({
          business: res.data.BusinessList
        })
      })
  }
    onSubmit = (event) => {
        event.preventDefault();
        // const {dt, duration, pending, completed, canceled, sid, uid} = this.state
        var id = firebase.auth().currentUser.uid;
        const startTime = this.state.dt;
        const durationInMinutes = this.state.duration;
        const startA = moment(startTime, 'HH:mm')
        const endA = moment(startTime, 'HH:mm').add(durationInMinutes, 'HH:mm').format('HH:mm');
        if(startA < moment(this.start,'HH:mm') || endA > moment(this.end,'HH:mm'))
            {return <p className="login-error-message">Invalid Hours for Appointment</p>}
        else{
            const endTime = moment(startTime, 'YYYY-MM-DDTHH:mm').add(durationInMinutes, 'minutes').format('YYYY-MM-DDTHH:mm');
            //this.setState({endDate:endTime})
            console.log("Start time: " + startTime)
            console.log("End Time:" + endTime)

            //falta cambiar la tabla de appointments para fit con este POST
            axios.post('http://localhost:5000/appointments', {
                startDate: this.state.dt,
                endDate: endTime,
                duration: this.state.duration,
                completed: 'False',
                pending: 'True',
                canceled: 'False',
                sid: this.state.sid,
                uid: id
            }).then(function(response){
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
            });
            this.props.history.push('/home');
    }}

    render(){
        this.getAllBusiness();
        const {date, duration, sid, bid } = this.state;
        var dt;
        return(
            <div className="form-container">                
                <form>
                    <Label>Date</Label>
                    <div>
                    <Flatpickr
                        data-enable-time 
                        placeholder="Please select a date"
                        name="date"
                        value={date}
                        onChange={date => {
                            dt = moment(date[0]).format('YYYY-MM-DDTHH:mm');
                            // console.log(dt)
                            this.setState({ dt });
                          }}
                    /> 
                    </div>
                <FormGroup>
                <Label>Business</Label>
                <Input name="bid" type="select" value={this.state.bid}>
                  {this.state.business.map((data,i) => (
                    <option onChange={() => this.getServicesByBusiness}>{data.bid}</option>
                  ))}
                </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Service Type</Label>
                    <Input name="sid" type="select" value={this.state.sid} onChange={() => this.getHours}>
                       {this.state.services.map((data,i) => (
                    <option onChange={() => this.getServicesByBusiness}>{data.sid}</option>
                           ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="duration">Duration (in minutes)</Label>
                    <Input name="duration" type="select" value={this.state.duration} onChange={this.onInputChange}>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                    </Input>
                </FormGroup>
                </form>
                <Button className="appointment-button" color="primary" onClick={this.onSubmit.bind(this)}>Schedule</Button>{' '}                
            </div>
            

        )
    }

}

export default withRouter(AppointmentForm);