import React, {Component} from 'react';
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import { Jumbotron, Button } from 'reactstrap';
import logo_white_circle from '../logo_white_circle.png'
import '../styles/LandingPage.css'


class LandingPageSegment extends Component{
    constructor(){
        super();
        this.state={
        }
        
    }
    render(){
        return(
            <div className="landing-page-segment"> 
                <p className="segment-title">{this.props.title}</p>
            </div>
            

        )
    }
}

export default LandingPageSegment;