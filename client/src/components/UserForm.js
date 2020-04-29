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
            user:[]
        };
    }

    onInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.fullName);
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

    componentDidMount(){
        this.getUser();
    }

    onSubmit = (event) => {
        event.preventDefault();
        var user = {
            uid: firebase.auth().currentUser.uid,
            fullname: this.state.fullName,
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phoneNumber,
            age: this.state.age,
            gender: this.state.gender,
            uaddress: "(testaddress, country1, city2, 00958)",
            isowner: false
        }
        axios.put('http://localhost:5000/users', {user})
            .then(function(response){
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
        });

    }
    
    // Example = (props) => {
    //     const [cSelected, setCSelected] = useState([]);
    //     const [rSelected, setRSelected] = useState(null);
    // }

    render(){
        return(
            <div className='form-container'>
                <Form>
                    <FormGroup>
                        <Label>Username</Label>
                        <input className='input-form' placeholder={this.state.username}></input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Name</Label>
                        <input name='fullName' placeholder={this.state.fullName} onChange={this.onInputChange}></input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <input placeholder={this.state.email}></input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone</Label>
                        <input placeholder={this.state.phoneNumber}></input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Age</Label>
                        <input placeholder={this.state.age}></input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Gender</Label>
                            <Input name="gender" type="select" value={this.state.gender} onChange={this.onInputChange}>
                                <option>M</option>
                                <option>F</option>
                            </Input>
                    </FormGroup>
                        {/* <ButtonGroup> */}
                            {/* <Button color="primary" onClick={this.state.user.gender === 'M'} value={this.state.user.gender}>Male</Button>
                            // <Button color="primary" onClick={this.state.user.gender === 'F'} value={this.state.user.gender}>Female</Button> */}
                            {/* <Button color="primary" onClick={() => setRSelected(2)} active={rSelected === 2}>Female</Button> */}
                            {/* <Button color="primary" onClick={() => setRSelected(3)} active={rSelected === 3}>Other</Button> */}
                        {/* </ButtonGroup> */}
                    <p>Selected: {this.state.gender}</p>
                </Form>
                <Button className="save-button" color="primary" onClick={this.onSubmit.bind(this)}>Save Changes</Button>{' '}                
            </div>
        )
    }
}

export default UserForm;