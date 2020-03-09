import React, {Component} from 'react';
import { Button, Input } from 'reactstrap';
import * as firebase from 'firebase';
import '../styles/Login.css'



class SignUpForm extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:''
        }

    
    }

    

    onInputChange = (event) => {
        event.preventDefault();
        
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createUserAccount(){
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(
            console.log("User Creation Successful"),
            console.log(firebase.auth().currentUser)
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
        return(
            <div className="signUp-form">
                <p className="login-title">Create an Account</p>

                <Input className="login-input" name="email" placeholder="email@email.com" onChange={this.onInputChange}/>
                <Input className="login-input" name="password" placeholder="password123" onChange={this.onInputChange}/>

                <Button className="login-button" color="primary" onClick={this.createUserAccount.bind(this)}>Create Account</Button>{' '}                
            </div>
            

        )
    }
}

export default SignUpForm;
