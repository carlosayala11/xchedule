import React, {Component} from 'react';
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import { Button } from 'reactstrap';


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
        if(this.state.isUserLogginIn){
            return (
                <div>
                    <LoginForm></LoginForm>
                    <Button onClick={this.changeUserLogginStatus.bind(this)}>Create an Account</Button>
                </div>
            
            )
                
        }else{
            return (
                <div>
                    <SignUpForm></SignUpForm>
                    <Button onClick={this.changeUserLogginStatus.bind(this)}>Login Instead</Button>
                </div>
            
            )
        }
        
    }



    render(){
        return(
            <div> 
                {this.renderForms()}                
            </div>
            

        )
    }
}

export default Login;