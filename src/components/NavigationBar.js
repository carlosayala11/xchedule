import React, {Component} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap';
import { stack as Menu } from 'react-burger-menu'
import '../styles/NavigationBar.css'
import {
    NavLink,
    Redirect
  } from "react-router-dom";
import CreateBusinessForm from '../components/CreateBusinessForm'
import UpddateBusinessForm from '../components/UpdateBusinessForm'
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
            user:'',
            fullname:'',
            labelName:'',
            modal:false
        }   
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // console.log(user)
                this.setState({username:user.email, loggedIn:true})
                const query = "http://127.0.0.1:5000/business/user/" + user.uid
                axios.get(query).then((res)=>{
                    this.setState({businessExists:true, userBusinessName: res.data.Business.bname})
                }).catch((err)=>{
                    console.log(err)
                })

                axios.get('http://127.0.0.1:5000/users',{
                    params: {
                        id: user.uid
                    }
                }).then((res)=>{
                    console.log(res.data.User)
                    this.setState({user:res.data.User, fullname:res.data.User.fullname}, ()=>{
                        console.log(this.state.fullname)
                    })
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

    renderBusinessForm(){
        if (!this.state.isOwner){
           // console.log(this.state.isOwner);
            return <CreateBusinessForm></CreateBusinessForm>
        }
        else{
            return <UpddateBusinessForm></UpddateBusinessForm>
        }
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

    toggle() {
        this.setState((prevState) => ({
            modal: !prevState.modal
          }));
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

    renderViewOrCreateBusiness(){
        if(this.state.businessExists){
            return (<div className="manage-business-container">
                <p className="manage-business">Manage Business</p>
                <span>
                <i class="fas fa-store business-icon"></i>
                    <NavLink className="burger-menu-item" to="/business/manage">{this.state.userBusinessName}</NavLink>
                </span>
            </div>)
        }
    }
    

    render(){
        if (this.state.signedOut) {
            return <Redirect to='/login'/>;
        }
        return(
            <div className="navigation-bar-container">
                <Menu>
                    <span>                    
                        <i className="fas fa-user-circle profile-icon"></i>
                    </span>
                    <p className="user-name">{this.state.fullname}</p>
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