import React, {Component} from 'react';
import LandingPageSegment from '../components/LandingPageSegment'
import { Button } from 'reactstrap';
import '../styles/LandingPage.css'
import logo_black_circle from '../logo_black_circle.png'
import {NavLink } from 'react-router-dom'



class LandingPage extends Component{
    constructor(){
        super();
        this.state={
        }

    }




    render(){
        return(
            <div className="landing-page">
                <div className="jumbotron-div">
                    <div className="jumbotron-segment">
                        <h1 className="jumbotron-title">Welcome to Xchedule</h1>
                        <p className="jumbotron-text">The online solution to schedule your appointments</p>
                        <br></br>
                        <p className="jumbotron-text">easily, quickly, and effectively</p>
                        <NavLink to="/login"> <Button>Login to Learn More</Button> </NavLink>

                    </div>
                    <img src={logo_black_circle} className="landing-logo" alt="xchedule logo"/>

                </div>

                <LandingPageSegment title="How it works?"></LandingPageSegment>
                <LandingPageSegment title="Contact Us"></LandingPageSegment>
            </div>


        )
    }
}

export default LandingPage;
