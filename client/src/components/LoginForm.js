import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import * as firebase from 'firebase';
import '../styles/Login.css'
import {Redirect} from 'react-router-dom'
import { Spinner } from 'reactstrap';


class LoginForm extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            loggedIn: false,
            loadingLoggin: false,
            modal:false,
            emailreset:'',
            errorMessage:''
        }
        this.renderLoginSpinner = this.renderLoginSpinner.bind(this)
    
    }


    onInputChange = (event) => {
        event.preventDefault();
        
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginExistingUser(){
        this.setState({loadingLoggin:true})
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
            console.log("SUCCESS")
            this.setState({
                loggedIn: true 
            })            
        }).catch((error) => {
            this.setState({loadingLoggin:false, errorMessage:error.message})

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode);
            console.log(errorMessage);
          });
    }

    renderLoginSpinner(){
        if(this.state.loadingLoggin){
            return <Spinner color="primary" />
        }else{
            return <p className="button-text">Login</p>
        }
    }

    toggle(){
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    sendPasswordReset(){
        firebase.auth().sendPasswordResetEmail(this.state.emailreset).then(function() {
            console.log("EMAIL SENT")
            // Email sent.
          }).catch(function(error) {
            // An error happened.
            console.log("Error")
          });
    }

    renderErrorMessage(){
        if(this.state.errorMessage){
            return <p className="login-error-message">{this.state.errorMessage}</p>
        }
    }


    render(){
        if (this.state.loggedIn) {
            return <Redirect to='/profile'/>;
        }
        return(
            <div className="login-form">
                <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                    <ModalHeader toggle={this.toggle.bind(this)}>Send Password Reset Email</ModalHeader>
                    <ModalBody>
                        <p>Enter your E-Mail to send a password reset email:</p>
                        <Input name="emailreset" onChange={this.onInputChange} placeholder="sample@email.com"></Input>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.sendPasswordReset.bind(this)}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>                
                <p className="login-title">Login</p>
                
                <Input className="login-input" name="email" placeholder="email@email.com" onChange={this.onInputChange}/>
                <Input type="password" className="login-input" name="password" placeholder="password123" onChange={this.onInputChange}/>
                <Button onClick={this.toggle.bind(this)} className="forgot-password-button">Forgot Password?</Button>
                <Button className="login-button" color="primary" onClick={this.loginExistingUser.bind(this)}>
                    {this.renderLoginSpinner()}
                </Button>
                {this.renderErrorMessage()}               
            </div>
            

        )
    }
}

export default LoginForm;
