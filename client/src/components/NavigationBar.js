import React, {Component} from 'react';
import {Button} from 'reactstrap';
import { stack as Menu } from 'react-burger-menu'
import '../styles/NavigationBar.css'
import {
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
            signedOut:false
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // console.log(user)
                this.setState({username:user.email, loggedIn:true})
                axios.get('http://localhost:5000/business',{
                    params: {
                        id: user.uid
                            }
                }).then((res)=>{
                    console.log(res.data.Business)
                    this.setState({businessExists:true, userBusinessName: res.data.Business.bname})
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
            return (<div>
                <NavLink className="burger-menu-item" to="/business/manage">{this.state.userBusinessName}</NavLink>
            </div>)
        }else{
            return (<div>
                <NavLink className="burger-menu-item" to="/business/create">+ Add Business</NavLink>
            </div>)
        }
    }

    renderProfileOrLogin(){
        if(this.state.loggedIn){
            return (<div>
                <Button color="danger" onClick={this.signOut.bind(this)}>Sign Out</Button>
            </div>)
        }else{
            return

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
                    {this.renderViewOrCreateBusiness()}
                    {this.renderProfileOrLogin()}
                </Menu>
            </div>
            
        )
    }
}

export default NavigationBar;