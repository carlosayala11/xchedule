import React, {Component} from 'react';
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
//import { Button } from 'reactstrap';
import '../styles/Login.css'
//import logo_white from '../logo_white.png'
import logo_black from '../logo_black.png'



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
                        <p>Don't have an account? Create an Account</p>
                    </div>
                </div>
            
            )
                
        }else{
            return (
                <div className="signup-container">
                    <SignUpForm></SignUpForm>
                    <div onClick={this.changeUserLogginStatus.bind(this)} className="change-login">
                        <p>Already have an account? Login</p>
                    </div>                
                </div>
            
            )
        }
        
    }



    render(){
        return(
            <div className="login-page"> 
                <img src={logo_black} className="logo" alt="xchedule logo"/>
                {this.renderForms()}                
            </div>
            

        )
    }
}

export default Login;