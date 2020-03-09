import React, {Component} from 'react';
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import { Button } from 'reactstrap';
import '../styles/Login.css'


class Login extends Component{
    constructor(){
        super();
        this.state={
            isUserLogginIn:false
        }
        
    }

    changeUserLogginStatus(){
        this.setState(prevState => ({
            isUserLogginIn: !prevState.isUserLogginIn
        }))
    }
    
    renderForms(){
        if(!this.state.isUserLogginIn){
            return (
                <div className="login-container">
                    <LoginForm></LoginForm>
                    <div onClick={this.changeUserLogginStatus.bind(this)} className="change-login">
                        <p>Don't have an account?</p>
                        
                        <p>Create an Account</p>
                    </div>
                </div>
            
            )
                
        }else{
            return (
                <div className="login-container">
                    <SignUpForm></SignUpForm>
                    <div onClick={this.changeUserLogginStatus.bind(this)} className="change-login">
                        <p>Already have an account? </p>
                        <p >Login</p>
                    </div>                
                </div>
            
            )
        }
        
    }



    render(){
        return(
            <div className="login-page"> 
                <p>INSERT XCHEDULE LOGO</p>
                {this.renderForms()}                
            </div>
            

        )
    }
}

export default Login;