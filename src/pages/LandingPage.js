import React, {Component} from 'react';
import { Button } from 'reactstrap';
import '../styles/LandingPage.css'
import {NavLink } from 'react-router-dom'



class LandingPage extends Component{
    constructor(){
        super();
        this.state={
        }

    }


    // <NavLink to="/login"> <Button>Login to Learn More</Button> </NavLink>


    render(){
        return(
            <div className="landing-page">
                <div className="jumbotron-segment">
                    <p className="jumbotron-title">Welcome to Xchedule</p>
                    <p className="jumbotron-description">The easy-to-use tool for making appointment at your favorite businesses</p>
                    <div className="jumbotron-buttons-div">
                        <NavLink to="/login"> <Button className="jumbotron-login-button">Returning User? Login.</Button> </NavLink>
                        <Button href="#about" className="jumbotron-learn-button">Learn More</Button>
                    </div>
                    
                </div>
                
                <div className="learn-more" id="about">
                    <p className="segment-title">How it works?</p>
                    <div className="about-container">
                        <div class="about-text">
                            <p className="about-description-title">SEARCH -</p>
                            <p className="about-description">for your favorite bussiness on the platform.  With Xchedule you can find many local businesses that have decided to improve their workflow by adding this platform to help with their appointment management. </p>

                        </div>
                        <span>
                            <i class="fas fa-store-alt landing-icon"></i>
                        </span>
                        {/* <img className="about-img" alt=""src="https://via.placeholder.com/150x150"></img> */}
                    </div>

                    <div className="about-container">
                        <span>
                            <i class="far fa-calendar-alt landing-icon"></i>
                        </span>
                        {/* <img className="about-img" alt=""src="https://via.placeholder.com/150x150"></img> */}

                        <div class="about-text">
                            <p className="about-description-title">SCHEDULE -</p>
                            <p className="about-description">your appointment on the available time slots.  See what time works best for you and secure that time slot for your appointment.</p>

                        </div>
                    </div>

                    <div className="about-container">
                        <div class="about-text">
                            <p className="about-description-title">SAVE - </p>
                            <p className="about-description">time by no more waiting on the phone on hold for someone to take your appointment.  See all your appointments in one place.</p>
                        </div>
                        <span>
                            <i class="fas fa-hourglass-start landing-icon"></i>
                        </span>
                        {/* <img className="about-img" alt=""src="https://via.placeholder.com/150x150"></img> */}

                    </div>

                    
                    
                </div>

                <div className="team-container">
                    <h1 className="team-title">Meet the team members</h1>
                    <div className="team-members-container">
                        <div className="team-member">
                            {/* <img className="team-member-img" alt=""src="https://via.placeholder.com/150x150"></img> */}
                            <p className="team-member-name">Carlos Ayala</p>
                            <p className="team-member-degree">Computer Science and Engineering</p>
        
                        </div>

                        <div className="team-member">
                            {/* <img className="team-member-img" alt="" src="https://via.placeholder.com/150x150"></img> */}
                            <p className="team-member-name">Gabriel Rosario</p>
                            <p className="team-member-degree">Software Engineering</p>
        
                        </div>

                        <div className="team-member">
                            {/* <img className="team-member-img" alt=""src="https://via.placeholder.com/150x150"></img> */}
                            <p className="team-member-name">Rex Reyes</p>
                            <p className="team-member-degree">Computer Science and Engineering</p>
                        </div>
                        <div className="team-member">
                            {/* <img className="team-member-img" alt=""src="https://via.placeholder.com/150x150"></img> */}
                            <p className="team-member-name">Yetsiel Aviles</p>
                            <p className="team-member-degree">Computer Science and Engineering</p>
                        </div>
                    </div>
                   
                </div>
                <div className="purpose-container">
                    <h1 className="purpose-header">Our Purpose</h1>
                    <p className="purpose-text">The purpose of this application is to create a solution for not only small businesses, but anyone that has the need to manage appointments to be able to do so in an efficient manner.  This idea was created for our Capstone Project in the University of Puerto Rico - Mayagüez for the Computer Science and Engineering and Software Engineering degrees. </p>
                    <NavLink className="footer-button" to="/home">Start making Appointments</NavLink>
                </div>
            </div>


        )
    }
}

export default LandingPage;
