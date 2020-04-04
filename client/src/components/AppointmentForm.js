import React, {Component} from 'react';
import { Button, Input, Label, FormGroup, Form } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";



class AppointmentForm extends Component{
    constructor(){
        super();
        this.state={
            datePickerIsOpen: false,
            date: new Date(),
            duration:''
        }
    }


    onInputChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    scheduleAppointment(){

    }

    render(){
        const { date } = this.state;
        return(
            <div className="form-container">                
                {/* <Input className="appointment-input" name="email" placeholder="email@email.com" onChange={this.onInputChange}/>
                <Input className="appointment-input" name="password" placeholder="password123" onChange={this.onInputChange}/> */}
                <Form>
                <FormGroup>
                    <Label>Date</Label>
                    <div>
                    <Flatpickr className="date-box" data-enable-time value={date} onChange={date => {
                        this.setState({ date });}}
                    />   
                    </div> 
                {/* <Button onClick={this.pickdate.bind(this)}></Button> */}
                </FormGroup>
                <FormGroup>
                    <Label for="duration">Duration (in minutes)</Label>
                    <Input name="duration" type="select">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                    </Input>
                </FormGroup>
                </Form>
                <Button className="appointment-button" color="primary" onClick={this.scheduleAppointment.bind(this)}>Schedule</Button>{' '}                
            </div>
            

        )
    }

}

export default AppointmentForm;