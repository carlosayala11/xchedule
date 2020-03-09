import React, {Component} from 'react';
import { Button, Input } from 'reactstrap';
import * as firebase from 'firebase';
import '../styles/Login.css'
import {Redirect} from 'react-router-dom'


class LoginForm extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            loggedIn: false
        }

    
    }


    onInputChange = (event) => {
        event.preventDefault();
        
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginExistingUser(){
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
            console.log("SUCCESS")
            this.setState({
                loggedIn: true 
            })
            

        }

            
        ).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode);
            console.log(errorMessage);
          });
    }


    render(){
        if (this.state.loggedIn) {
            return <Redirect to='/profile'/>;
          }
        return(
            <div className="login-form">
                <p className="login-title">Login</p>
                
                <Input className="login-input" name="email" placeholder="email@email.com" onChange={this.onInputChange}/>
                <Input type="password" className="login-input" name="password" placeholder="password123" onChange={this.onInputChange}/>
                <p className="login-small-text">Forgot Password?</p>
                <Button className="login-button" color="primary" onClick={this.loginExistingUser.bind(this)}>Login</Button>{' '}                
            </div>
            

        )
    }
}

export default LoginForm;
