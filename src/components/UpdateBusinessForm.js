import React, {Component, useState} from 'react';
import { Button, Input, Label, FormGroup, Form, ButtonGroup } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import moment from 'moment'
import '../styles/UpdateBusiness.css'
var axios = require('axios');
var firebase = require('firebase');

class UpdateBusinessForm extends Component{
    constructor(){
        super();
        this.state={
            bid: '',
            name: '',
            twitter: '',
            facebook: '',
            instagram: '',
            website: '',
            sworkingHours: '',
            eworkingHours: '',
            workingDays: '',
            baddress: '',
            country: '',
            city: '',
            zip: '',
            timeRestriction: '',
            loggedIn:false
        };
    }

    onInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getBusiness() {
        var id = firebase.auth().currentUser.uid;
        console.log(this.state.id);
        axios.get('https://xchedule-api.herokuapp.com/business', {
            params: {
                id: id
            }
        })
        .then(res => {
            var business = res.data.Business;
            console.log("business",business);
            this.setState({bid: business.bid})
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    getUser() {
        var id = firebase.auth().currentUser.uid;
        console.log(this.state.id);
        axios.get('https://xchedule-api.herokuapp.com/users',{
            params: {
                id: id
            }
        })
        .then(res => {
            var user = res.data.User;
            console.log("user",user);
            this.setState({fullName: user.fullname})
            this.setState({email: user.email})
            this.setState({gender: user.gender})
            this.setState({username: user.username})
            this.setState({phoneNumber: user.phone})
            this.setState({age: user.age})
            this.setState({address: user.address})
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.setState({username:user.email, loggedIn:true})
              // User is signed in.
              this.getUser();
              this.getBusiness();
            } else {
                console.log("no user")
              // No user is signed in.
            }
          });
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.bid);
        axios.put('https://xchedule-api.herokuapp.com/business/update', {
            uid: firebase.auth().currentUser.uid,
            bid: 6,
            bname: this.state.name,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            website_url: this.state.website,
            sworkingHours: this.state.sworkingHours,
            eworkingHours: this.state.eworkingHours,
            workingDays: this.state.workingDays,
            baddress: this.state.baddress,
            country: this.state.country,
            city: this.state.city,
            zip: this.state.zip,
            timeRestriction: this.state.timeRestriction
        })
            .then(function(response){
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
                        <Label>Business Name</Label>
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
                        <Label>Start Working Hours</Label>
                        <Input name='sworkingHours' placeholder={this.state.sworkingHours} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>End Working Hours</Label>
                        <Input name='eworkingHours' placeholder={this.state.eworkingHours} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Working Days</Label>
                        <Input name='workingDays' placeholder={this.state.workingDays} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Business Address</Label>
                        <Input name='baddress' placeholder={this.state.baddress} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Country</Label>
                        <Input name='country' placeholder={this.state.country} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>City</Label>
                        <Input name='city' placeholder={this.state.city} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Zip Code</Label>
                        <Input name='zip' placeholder={this.state.zip} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Time Restriction</Label>
                        <Input name='timeRestriction' placeholder={this.state.timeRestriction} onChange={this.onInputChange}></Input>
                    </FormGroup>
                </Form>
                <Button className="save-button" color="primary" onClick={this.onSubmit.bind(this)}>Save Changes</Button>{' '}
            </div>
        )
    }
}

export default UpdateBusinessForm;