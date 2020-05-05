import React, {Component} from 'react';
import { Button, Input, Spinner, Container, Row, Col } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import * as firebase from 'firebase';
import '../styles/Login.css'
import axios from 'axios'



class SignUpForm extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            passwordretype:'',
            fullName:'',
            phoneNumber:'',
            username:'',
            age:'',
            sex:'',
            country:'',
            city:'',
            loadingSignUp:false,
            errorMessage:'',
            userSignedUp:false
        }
    }

    

    onInputChange = (event) => {
        event.preventDefault();
        
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createUserAccount(){ 
        this.setState({loadingSignUp:true})
        if(this.state.password === this.state.passwordretype){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
                console.log("User Creation Successful")
                var user = {
                    uid: firebase.auth().currentUser.uid,
                    fullname: this.state.fullName,
                    username: this.state.username,
                    email: this.state.email,
                    phone: this.state.phoneNumber,
                    age: this.state.age,
                    gender: this.state.sex,
                    uaddress: "(testaddress, country1, city2, 00958)",
                    isowner: false
                }
                console.log(user)
                axios.post("http://127.0.0.1:5000/users/insert", user).then((res)=>{
                    this.setState({userSignedUp:true})
                 console.log(res)    
                }).catch((err)=>{
                 console.log(err)    
                })
            }).catch((error) => {
                this.setState({loadingSignUp:false, errorMessage:error.message})
    
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode);
                console.log(errorMessage);
              });
        }
        
    }

    renderSignUpSpinner(){
        if(this.state.loadingSignUp){
            return <Spinner color="primary" />
        }else{
            return <p className="button-text">SignUp</p>
        }
    }

    renderErrorMessage(){
        if(this.state.errorMessage){
            return <p className="login-error-message">{this.state.errorMessage}</p>
        }
    }


    render(){
        if(this.state.userSignedUp){
            return <Redirect to='/home'/>;
            
        }
        return(
            <div className="signUp-form">
                <p className="login-title">Create an Account</p>
                <Container>
                    <Row>
                        <Col>
                            <Input className="login-input" name="email" placeholder="email@email.com" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                            <Input className="login-input" name="age" placeholder="Age" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input type="password" className="login-input" name="password" placeholder="password123" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                            <Input className="login-input" name="sex" placeholder="Sex" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input type="password" className="login-input" name="passwordretype" placeholder="password123" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                        <Input className="login-input" name="phoneNumber" placeholder="7875555555" onChange={this.onInputChange}/>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input className="login-input" name="username" placeholder="username" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                        <Input className="login-input" name="country" placeholder="Country" onChange={this.onInputChange}/>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input className="login-input" name="fullName" placeholder="Name" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                        <Input className="login-input" name="city" placeholder="City" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                    
                </Container>

                <Button className="login-button" color="primary" onClick={this.createUserAccount.bind(this)}>
                    {this.renderSignUpSpinner()}
                </Button>   

                {this.renderErrorMessage()}            
            </div>
            

        )
    }
}

export default SignUpForm;
