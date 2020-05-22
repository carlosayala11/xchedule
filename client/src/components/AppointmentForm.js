import React, {Component} from 'react';
import { Button, Input, Label, FormGroup } from 'reactstrap';
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
            bname:'',
            bid:'',
            serviceid:'',
            serviceType:'',
            date: '',
            start: '',
            end: '',
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
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
        axios.get(`http://localhost:5000/business/services`,{
            params: {
                name: event.target.value
            }
        })
      .then(res => {
          console.log(res.data)
        this.setState({
          services: res.data.ServicesByBusinessName
        })
      })
    }
    onInputChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
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
    getHours = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
        axios.get('http://localhost:5000/service',{
            params: {
                name: event.target.value
            }
        })
        .then(res => {
          console.log(res.data)
          this.setState({
            serviceid: res.data.Service.sid
          })
        })
        axios.get('http://localhost:5000/services/business',{
            params: {
                name: event.target.value
            }
        })
      .then(res => {
        this.setState({
          start: res.data.BusinessHours.starttime
        })
        this.setState({
          end: res.data.BusinessHours.endtime
        })
        })
        }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.serviceid);
        // const {dt, duration, pending, completed, canceled, sid, uid} = this.state
        var id = firebase.auth().currentUser.uid;
        const startTime = this.state.dt;
        const durationInMinutes = this.state.duration;
        const endTime = moment(startTime, 'YYYY-MM-DDTHH:mm').add(durationInMinutes, 'minutes').format('YYYY-MM-DDTHH:mm');

        if(startTime < moment(this.state.start,'YYYY-MM-DDTHH:mm')){
            return <p>Invalid Hours for Appointment</p>}
        if(startTime > moment(this.state.end,'YYYY-MM-DDTHH:mm')){
            return <p>Invalid Hours for Appointment</p>}
        if(endTime < moment(this.state.start,'YYYY-MM-DDTHH:mm')){
            return <p>Invalid Hours for Appointment</p>}
        if(endTime > moment(this.state.end,'YYYY-MM-DDTHH:mm')){
            return <p>Invalid Hours for Appointment</p>}

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
            sid: this.state.serviceid,
            uid: id
        }).then(function(response){
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
        });
        this.props.history.push('/home');
    }
    componentDidMount(){
       this.getAllBusiness();
    }
    render(){
        const {date, duration, bname, serviceType } = this.state;
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
                    <Input name="bname" type="select" value={this.state.bname} onChange={this.getServicesByBusiness}>
                        {this.state.business.map(bus => <option>{bus.bname}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Services</Label>
                    <Input name="serviceType" type="select" value={this.state.serviceType} onChange={this.getHours}>
                        {this.state.services.map(ser => <option>{ser.serviceType}</option>)}
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