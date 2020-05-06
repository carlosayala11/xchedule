import React, {Component, useState} from 'react';
import { Button, Input, Label, FormGroup, Form, ButtonGroup } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import moment from 'moment'
import '../styles/Profile.css'

var axios = require('axios');
var firebase = require('firebase');

class UserForm extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            fullName:'',
            phoneNumber:'',
            username:'',
            age:'',
            gender:'',
            address:'',
            loggedIn:false
        };
    }

    onInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
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
            } else {
                console.log("no user")
              // No user is signed in.
            }
          });
    }

    onSubmit = (event) => {
        event.preventDefault();
        axios.put('https://xchedule-api.herokuapp.com/users/update', {
            uid: firebase.auth().currentUser.uid,
            fullname: this.state.fullName,
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phoneNumber,
            age: this.state.age,
            gender: this.state.gender,
            address: "(testaddress, country1, city2, 00958)",
            isowner: false
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
                        <Label>Username</Label>
                        <Input name="username" className='input-form' placeholder={this.state.username} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input name='fullName' placeholder={this.state.fullName} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input name="email" placeholder={this.state.email} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone</Label>
                        <Input name='phoneNumber' placeholder={this.state.phoneNumber} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Age</Label>
                        <Input name='age' placeholder={this.state.age} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Gender</Label>
                            <Input name="gender" type="select" value={this.state.gender} onChange={this.onInputChange}>
                                <option>M</option>
                                <option>F</option>
                            </Input>
                    </FormGroup>
                    <p>Selected: {this.state.gender}</p>
                    <Form action="/business">
                    <button type="submit">Create a Business</button>
                    </Form>
                    <Form action="/business/update">
                    <button type="submit">Update Business</button>
                    </Form>
                </Form>
                <Button className="save-button" color="primary" onClick={this.onSubmit.bind(this)}>Save Changes</Button>{' '}                
            </div>
        )
    }
}

export default UserForm;