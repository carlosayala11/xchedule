import React, {Component} from 'react';
import { Button, Popover, PopoverHeader, PopoverBody, Card, CardTitle,
    Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { stack as Menu } from 'react-burger-menu'
import '../styles/NavigationBar.css'
import {
    NavLink,
    Redirect,
    withRouter
  } from "react-router-dom";
import CreateBusinessForm from '../components/CreateBusinessForm'
import UpddateBusinessForm from '../components/UpdateBusinessForm'
import axios from 'axios';
  var firebase = require('firebase');




class NavigationBar extends Component{
    constructor(){
        super();
        this.state={
            loggedIn:true,
            username:"",
            popoverOpen:false,
            businessExists: false,
            signedOut:false,
            user:'',
            fullname:'',
            labelName:'',
            modal:false,
            chats: [],
            id: '' ,
            business_chats: [],
            bid: sessionStorage.getItem('openChat'),
            modal: false,
            businesses: []
        }   
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // console.log(user)
                this.setState({username:user.email})
                this.setState({id: firebase.auth().currentUser.uid});
                this.getChats();
                this.getBusinessChats();
                this.getAllBusiness();
                const query = "https://xchedule-api.herokuapp.com/business/user/" + user.uid
                axios.get(query).then((res)=>{
                    this.setState({businessExists:true, userBusinessName: res.data.Business.bname})
                }).catch((err)=>{
                    console.log(err)
                })

                axios.get('https://xchedule-api.herokuapp.com/users',{
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
                this.setState({loggedIn:false})
                
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

    getAllBusiness = () => {
        axios.get(`https://xchedule-api.herokuapp.com/business`)
          .then(res => {
              console.log(res.data)
            this.setState({
              businesses: res.data.BusinessList
            })
          })
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

    getChats(){
        //console.log(this.state.id);
        axios.get('https://xchedule-api.herokuapp.com/chats',{
            params: {
                uid: this.state.id
            }
        })
        .then(res => {
            this.setState({chats: res.data.Chats});
            //console.log(res.data.Chats)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getBusinessChats(){
        //console.log(this.state.bid);
        axios.get('https://xchedule-api.herokuapp.com/chats/business',{
            params: {
                bid: this.state.bid
            }
        })
        .then(res => {
            this.setState({business_chats: res.data.Chats});
            //console.log('business',res.data.Chats)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    openMessages(bid){
        sessionStorage.setItem('openChat', bid)
        this.props.history.push('/messages')
    }

    openBusinessMessages(uid){
        sessionStorage.setItem('senderId', uid)
        this.props.history.push('/messages')
    }

    renderMessages(){
        if(this.state.loggedIn){
            const {chats, business_chats, businesses} = this.state;
            console.log("Chats", chats);
            console.log("BChats", business_chats);
            const ChatsList = chats.map((chats) =>
                <Card key={chats.bid} style={{cursor: 'pointer'}} onClick={() => this.openMessages(chats.bid)} className="ml-0">
                    <CardTitle>{chats.bname}</CardTitle>
                </Card>);
                const BusinessChatsList = business_chats.map((business_chats) =>
                <Card key={business_chats.uid} style={{cursor: 'pointer'}} onClick={() => this.openBusinessMessages(business_chats.uid)} className="ml-0">
                    <CardTitle>{business_chats.full_name}</CardTitle>
                </Card>);
                const listItems = businesses.map((businesses) =>
                <Card key={businesses.bid} style={{cursor: 'pointer'}} onClick={() => this.openMessages(businesses.bid)}>
                    {/* <img className="business-img" alt="" src="https://via.placeholder.com/150x150"></img> */}
                    <CardTitle>{businesses.bname}</CardTitle>
                    <p className="city">{businesses.city}</p>
                    <p className="working-hours">Working Hours:</p> 
                    <p className="hours">{businesses.sworkingHours} - {businesses.eworkingHours}</p>
                    <p className="working-days">{businesses.workingDays}</p>
                    <div className="button-container">
                    </div>
                </Card>);
            return (<div className="nav-bar-user">
                <Button className="app-btn" id="Popover1" type="button">
                    Messages
                </Button>
                <Popover className="popover" placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglePopover.bind(this)}>
                    <PopoverHeader>Your Messages</PopoverHeader>
                    <PopoverBody>
                        <Button onClick={this.toggle}>New Message</Button>
                        <Modal modalClassName="business-modal" isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Select a Business</ModalHeader>
                            <ModalBody>
                                {listItems}
                            </ModalBody>
                            <ModalFooter>
                                {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                       {ChatsList}
                       {BusinessChatsList}
                    </PopoverBody>
                </Popover> 
            </div>)
        }
    }

    

    render(){
        if(!this.state.loggedIn){
            return <Redirect to='/login'/>;
        }
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
                {this.renderMessages()}

            </div>
            
        )
    }
}

export default withRouter(NavigationBar);