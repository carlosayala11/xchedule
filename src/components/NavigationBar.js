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
import axios from 'axios';
  var firebase = require('firebase');




class NavigationBar extends Component{
    constructor(){
        super();
        this.state={
            loggedIn:false,
            username:"",
            popoverOpen:false,
            businessExists: false,
            signedOut:false,
            user:''
        }   
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // console.log(user)
                this.setState({username:user.email, loggedIn:true})
                const userQuery = "http://localhost:5000/users/"+user.uid
                const query = "http://localhost:5000/business/user/" + user.uid
                axios.get(query).then((res)=>{
                    this.setState({businessExists:true, userBusinessName: res.data.Business.bname})
                }).catch((err)=>{
                    console.log(err)
                })

                axios.get(userQuery).then((res)=>{
                    console.log(res.data.User)
                    this.setState({user:res.data.User})
                }).catch((err)=>{
                    console.log(err)
                })
 
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

    renderViewOrCreateBusiness(){
        if(this.state.businessExists){
            return (<div className="manage-business-container">
                <p className="manage-business">Manage Business</p>
                <span>
                <i class="fas fa-store business-icon"></i>
                    <NavLink className="burger-menu-item" to="/business/manage">{this.state.userBusinessName}</NavLink>
                </span>
            </div>)
        }else{
            return (<div className="manage-business-container">
                <p className="manage-business">Manage Business</p>
                <span>
                    <i class="fas fa-plus-circle business-icon"></i>
                    <NavLink className="burger-menu-item" to="/business/create">+ Add Business</NavLink>
                </span>
            </div>)
        }
    }

    renderProfileOrLogin(){
        if(this.state.loggedIn){
            return (<div>
                <Button className="signout-button" color="danger" onClick={this.signOut.bind(this)}>Sign Out</Button>
            </div>)
        }
        if(this.state.signedOut){
            return <Redirect to="/login"></Redirect>
        }
    }

    render(){
        if (this.state.signedOut) {
            return <Redirect to='/login'/>;
        }
        return(
            <div className="navigation-bar-container">
                <Menu>
                    <img className="business-img" src="https://via.placeholder.com/150x150"></img>
                    <p className="user-name">{this.state.user.fullname}</p>
                    <NavLink className="burger-menu-item" to="/home">Home</NavLink>
                    <NavLink className="burger-menu-item" to="/profile">Profile</NavLink>
                    <NavLink className="burger-menu-item" to="/">About Us</NavLink>
                    {this.renderViewOrCreateBusiness()}
                    {this.renderProfileOrLogin()}
                </Menu>
            </div>
            
        )
    }
}

export default NavigationBar;