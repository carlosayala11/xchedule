import React, {Component} from 'react';
import { Button, Input, Label, FormGroup, Form } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import axios from 'axios'
import moment from 'moment'


class AppointmentForm extends Component{
    constructor(){
        super();
        this.state={
            date: '',
            duration:'',
            completed:'',
            pending:'',
            canceled:'',
        };
    }

    onInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {dt, duration, pending, completed, canceled, sid, uid} = this.state
        axios.post('http://localhost:5000/appointments', {
            adate: dt, 
            duration: duration,
            completed: 'False', 
            pending: 'True',
            canceled: 'False',
            sid: 1,
            uid:1 })
            .then(function(response){
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
        });

    } 

    

    // scheduleAppointment(){
    //     axios.post('http://localhost:5000/appointments').then(result =>{
    //         console.log(result.data)
    //     });
    // }

    render(){
        const {date, duration } = this.state;
        var dt;
        return(
            <div className="form-container">                
                <form>
                    <Label>Date</Label>
                    <div>
                    <Flatpickr 
                        placeholder="Please select a date"
                        name="date"
                        value={date}
                        onChange={date => {
                            dt = moment(date[0])
                            console.log(dt)
                            this.setState({ dt });
                          }}
                    /> 
                    </div> 
                
                <FormGroup>
                    <Label for="duration">Duration (in minutes)</Label>
                    <Input name="duration" type="select" value={duration} onChange={this.onInputChange}>
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

export default AppointmentForm;