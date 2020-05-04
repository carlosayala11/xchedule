import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import React, {Component, useState} from 'react';
import "flatpickr/dist/themes/dark.css";
import moment from 'moment'
import '../styles/Business.css'

var axios = require('axios');
var firebase = require('firebase');
class BusinessForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            twitter: '',
            facebook: '',
            instagram: '',
            website: '',
            workingHours: '',
            workingDays: '',
            address: '',
            timeRestriction: ''
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
        axios.post('http://localhost:5000/business', {
            name: this.state.name,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            website: this.state.website,
            workingHours: this.state.workingHours,
            workingDays: this.state.workingDays,
            address: "(testaddress, country1, city2, 00958)", //this.state.address,
            timeRestriction: this.state.timeRestriction,
            uid: firebase.auth().currentUser.uid
        }).then(function(response){
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
        });

    }

    render(){
        return(
            <div className='form-container'>
                <Form>
                    <FormGroup>
                        <Label>Business name</Label>
                        <Input name="name" className='input-form' placeholder={this.state.name} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Twitter</Label>
                        <Input name='twitter' placeholder={this.state.twitter} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Facebook</Label>
                        <Input name="facebook" placeholder={this.state.facebook} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Instagram</Label>
                        <Input name='instagram' placeholder={this.state.instagram} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Website</Label>
                        <Input name='website' placeholder={this.state.website} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Working Hours</Label>
                        <Input name='workingHours' placeholder={this.state.workingHours} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Working Days</Label>
                        <Input name='workingDays' placeholder={this.state.workingDays} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="timeRestriction">Time Restriction (in minutes)</Label>
                        <Input name="timeRestriction" type="select" value={this.state.timeRestriction} onChange={this.onInputChange}>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                        <option>60</option>
                        </Input>
                    </FormGroup>
                </Form>
                <Button className="save-button" color="primary" onClick={this.onSubmit.bind(this)}>Save Changes</Button>{' '}
            </div>
        )
    }
}

export default BusinessForm;