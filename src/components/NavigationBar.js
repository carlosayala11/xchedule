import React, {Component} from 'react';
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import { Jumbotron, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import logo_white from '../logo_white.png'
import { stack as Menu } from 'react-burger-menu'
import '../styles/NavigationBar.css'
import {
    BrowserRouter as Router,
    NavLink,
    Redirect
  } from "react-router-dom";
  var firebase = require('firebase');




class NavigationBar extends Component{
    constructor(){
        super();
        this.state={
            loggedIn:false,
            username:"",
            popoverOpen:false,
            signedOut:false
        }   
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.setState({username:user.email, loggedIn:true})
              // User is signed in.
            } else {
                console.log("no user")
              // No user is signed in.
            }
          });
    }

    togglePopover(){
        this.setState(prevState => ({
            popoverOpen: !prevState.popoverOpen
        }))
    }

    signOut(){
        firebase.auth().signOut().then(()=> {
            // Sign-out successful.
            this.setState({loggedIn:false, signedOut:true})
          }).catch(function(error) {
            // An error happened.
          });
    }

    renderProfileOrLogin(){
        if(this.state.loggedIn){
            return (<div className="nav-bar-user">
                <Button id="Popover1" type="button">
                    {this.state.username}
                </Button>
                <Popover className="popover" placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglePopover.bind(this)}>
                    <PopoverHeader>Manage Account</PopoverHeader>
                    <PopoverBody>
                        <NavLink to="/profile">Go to Profile</NavLink>
                        <Button color="danger" onClick={this.signOut.bind(this)}>Sign Out</Button>
                    </PopoverBody>
                    
                </Popover>
            </div>)
        }else{
            return <NavLink className="nav-bar-user" to="/login">Sign In/Sign Up</NavLink>

        }
    }

    render(){
        if (this.state.signedOut) {
            return <Redirect to='/login'/>;
        }
        return(
            <div className="navigation-bar-container">
                <Menu>
                    <NavLink className="burger-menu-item" to="/home">Home</NavLink>
                    <NavLink className="burger-menu-item" to="/profile">Profile</NavLink>
                    <NavLink className="burger-menu-item" to="/">About Us</NavLink>
                </Menu>
                {this.renderProfileOrLogin()}
            </div>
            
        )
    }
}

export default NavigationBar;