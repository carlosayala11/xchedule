import React, {Component} from 'react';
import { Button, Input, Label, FormGroup, Form } from 'reactstrap';
import "flatpickr/dist/themes/dark.css";
import '../styles/Profile.css'

var axios = require('axios');
var firebase = require('firebase');

class UserForm extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            bid:'',
            fullName:'',
            phoneNumber:'',
            username:'',
            age:'',
            gender:'',
            address:'',
            country:'',
            city:'',
            zip:'',
            loggedIn:false,
            errorMessage:'',
            businessCreated:false
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
            this.setState({country: user.country})
            this.setState({city: user.city})
            this.setState({zip: user.zip})
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

        })
        .catch((error) => {
                this.setState({errorMessage: error.message})
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
    renderErrorMessage(){
        if(this.state.errorMessage){
            console.log(this.state.errorMessage)
            return <p className="login-error-message">{this.state.errorMessage}</p>}
        if(this.state.businessCreated) {
            return <p className="login-error-message">Created</p>}

        }

    onDelete = (event) => {
        event.preventDefault();
        this.getBusiness();
        var id = this.state.bid
        if(id){
        axios.delete('http://localhost:5000/delete', {
            params: {
                id: id
            }
        })
            .then(res => {
                console.log(res);
                this.setState({businessCreated: true})
            })
            .catch((error) => {
                this.setState({errorMessage: error.message})
              });
        }

    }

    onSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/users/update', {
            uid: firebase.auth().currentUser.uid,
            fullname: this.state.fullName,
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phoneNumber,
            age: this.state.age,
            gender: this.state.gender,
            address: this.state.address,
            country: this.state.country,
            city: this.state.city,
            zip: this.state.zip,
            isowner: false
        })
            .then(function (response) {
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
                        <Label>Gender</Label>
                            <Input name="gender" type="select" value={this.state.gender} onChange={this.onInputChange}>
                                <option>M</option>
                                <option>F</option>
                            </Input>
                  </FormGroup>
                    <p>Selected: {this.state.gender}</p>
                    <Form>
                    <button type="submit" onClick={this.onDelete.bind(this)}>Delete Business</button>
                    </Form>
                    {this.renderErrorMessage()}
                </Form>
                <Button className="save-button" color="primary" onClick={this.onSubmit.bind(this)}>Save Changes</Button>{' '}                
            </div>
        )
    }
}

export default UserForm;