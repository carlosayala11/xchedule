import React, {Component} from 'react';
import { Button, Input, Label, FormGroup, Form } from 'reactstrap';
import "flatpickr/dist/themes/dark.css";
import '../styles/UpdateBusiness.css'
import {Redirect} from "react-router-dom";

var axios = require('axios');
var firebase = require('firebase');

class UpdateBusinessForm extends Component{
    constructor(){
        super();
        this.state={
            bid:'',
            name:'',
            twitter:'',
            facebook:'',
            instagram: '',
            website:'',
            sworkingHours:'',
            eworkingHours:'',
            workingDays:'',
            address:'',
            country:'',
            city:'',
            zip:'',
            timeRestriction:'',
            businessCreated:false,
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
        axios.get('http://localhost:5000/users',{
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
    getBusiness() {
        var id = firebase.auth().currentUser.uid;
        console.log(this.state.id);
        axios.get('http://localhost:5000/business',{
            params: {
                id: id
            }
        })
        .then(res => {
            var bus = res.data.Business;
            console.log("business",bus);
            this.setState({bid: bus.bid})
            this.setState({name: bus.bname})
            this.setState({twitter: bus.twitter})
            this.setState({facebook: bus.facebook})
            this.setState({twitter: bus.twitter})
            this.setState({instagram: bus.instagram})
            this.setState({website: bus.website_url})
            this.setState({sworkingHours:bus.sworkingHours})
            this.setState({eworkingHours: bus.eworkingHours})
            this.setState({workingDays: bus.workingDays})
            this.setState({address: bus.baddress})
            this.setState({country: bus.country})
            this.setState({city: bus.city})
            this.setState({zip: bus.zip})
            this.setState({timeRestriction: bus.timeRestriction})

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
                console.log(this.state.bid);
            } else {
                console.log("no user")
              // No user is signed in.
            }
          });
    }

    onSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/business/update', {
            uid: firebase.auth().currentUser.uid,
            bid:this.state.bid,
            bname: this.state.name,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            website_url: this.state.website,
            sworkingHours: this.state.sworkingHours,
            eworkingHours: this.state.eworkingHours,
            workingDays: this.state.workingDays,
            baddress: this.state.address,
            country: this.state.country,
            city: this.state.city,
            zip: this.state.zip,
            timeRestriction: this.state.timeRestriction
        })
            .then((res)=>{this.setState({businessCreated:true})
            console.log(res)
        }).catch((error) => {
                console.log(error);
        });
    }

    render(){
        if(this.state.businessCreated){
            return <Redirect to='/profile'/>;

        }
        return(
            <div className='form-container'>
                <Form>
                    <FormGroup>
                        <Label>Name</Label>
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
                        <Label>Address</Label>
                        <Input name='address' placeholder={this.state.address} onChange={this.onInputChange}></Input>
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
                        <Label>Zip code</Label>
                        <Input name='zip' placeholder={this.state.zip} onChange={this.onInputChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Time Restriction in Minutes</Label>
                        <Input name='timeRestriction' placeholder={this.state.timeRestriction} onChange={this.onInputChange}></Input>
                    </FormGroup>
                </Form>
                <Button className="save-button" color="primary" onClick={this.onSubmit.bind(this)}>Save Changes</Button>{' '}
            </div>
        )
    }
}

export default UpdateBusinessForm;