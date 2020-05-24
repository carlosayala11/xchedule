import React, {Component} from 'react';
import {Button } from 'reactstrap';
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
                    <p className="jumbotron-title">Welcome to X-Chedule</p>
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
                            <p className="about-description-title">SEARCH --</p>
                            <p className="about-description">for your favorite bussiness on the platform.</p>
                            <Button className="about-button">Some Action Button</Button>

                        </div>
                        <img className="about-img" src="https://via.placeholder.com/150x150"></img>
                    </div>

                    <div className="about-container">
                        <img className="about-img" src="https://via.placeholder.com/150x150"></img>
                        <div class="about-text">
                            <p className="about-description-title">SAVE -- </p>
                            <p className="about-description">your appointment and see it on your calendar</p>
                            <Button className="about-button">Some Action Button</Button>
                        </div>
                    </div>

                    <div className="about-container">
                        <div class="about-text">
                            <p className="about-description-title">OTRA PALABRA--</p>
                            <p className="about-description">otra descripcion pa poner aqui</p>
                            <Button className="about-button">Some Action Button</Button>

                        </div>
                        <img className="about-img" src="https://via.placeholder.com/150x150"></img>
                    </div>

                </div>

                <div className="team-container">
                    <h1 className="team-title">Meet the team members</h1>
                    <div className="team-members-container">
                        <div className="team-member">
                            <img className="team-member-img" src="https://via.placeholder.com/150x150"></img>
                            <p className="team-member-name">Carlos Ayala</p>
                            <p className="team-member-degree">Computer Science and Engineering</p>

                        </div>

                        <div className="team-member">
                            <img className="team-member-img" src="https://via.placeholder.com/150x150"></img>
                            <p className="team-member-name">Gabriel Rosario</p>
                            <p className="team-member-degree">Software Engineering</p>

                        </div>

                        <div className="team-member">
                            <img className="team-member-img" src="https://via.placeholder.com/150x150"></img>
                            <p className="team-member-name">Rex Reyes</p>
                            <p className="team-member-degree">Computer Science and Engineering</p>
                        </div>
                        <div className="team-member">
                            <img className="team-member-img" src="https://via.placeholder.com/150x150"></img>
                            <p className="team-member-name">Yetsiel Aviles</p>
                            <p className="team-member-degree">Computer Science and Engineering</p>
                        </div>
                    </div>

                </div>
            </div>


        )
    }
}

export default LandingPage;