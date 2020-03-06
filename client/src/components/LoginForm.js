import React, {Component} from 'react';
import { Button, Input } from 'reactstrap';
import * as firebase from 'firebase';


class LoginForm extends Component{
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

    loginExistingUser(){
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
            console.log("User Login Successful"),
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
            <div>
                <Input name="email" placeholder="email@email.com" onChange={this.onInputChange}/>
                <Input name="password" placeholder="password123" onChange={this.onInputChange}/>

                <Button color="primary" onClick={this.loginExistingUser.bind(this)}>Login User</Button>{' '}                
            </div>
            

        )
    }
}

export default LoginForm;
