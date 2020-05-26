import React, {Component} from 'react';
import { Button, Popover, PopoverHeader, PopoverBody, Card, CardTitle } from 'reactstrap';
import { stack as Menu } from 'react-burger-menu'
import '../styles/NavigationBar.css'
import {
    NavLink,
    withRouter,
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
            chats: [],
            id: '' ,
            business_chats: [],
            bid: 13     
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // console.log(user)
                this.setState({username:user.email, loggedIn:true})
                this.setState({id: firebase.auth().currentUser.uid});
                this.getChats();
                this.getBusinessChats();
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
            }else {
                console.log("no user")
              // No user is signed in.
            }
        })
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
        }
    }

    getChats(){
        //console.log(this.state.id);
        axios.get('http://localhost:5000/chats',{
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
        axios.get('http://localhost:5000/chats/business',{
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

    openMessages(bid){
        //console.log("Key", bid)
        sessionStorage.setItem('openChat', bid)
        this.props.history.push('/messages')
    }

    openBusinessMessages(uid){
        sessionStorage.setItem('senderId', uid)
        this.props.history.push('/messages')
    }

    renderMessages(){
        if(this.state.loggedIn){
            //const messages = Array.from(this.state.messages);
            const {chats, business_chats} = this.state;
            console.log("Chats", chats);
            console.log("BChats", business_chats);
            const ChatsList = chats.map((chats) =>
                <Card key={chats.bid} onClick={() => this.openMessages(chats.bid)}>
                    <CardTitle>{chats.bname}</CardTitle>
                    {/* <span onClick={() => this.openMessages(chats.bid)}>Schedule</span> */}
                </Card>);
                const BusinessChatsList = business_chats.map((business_chats) =>
                <Card key={business_chats.uid} onClick={() => this.openBusinessMessages(business_chats.uid)}>
                    <CardTitle>{business_chats.full_name}</CardTitle>
                    {/* <span onClick={() => this.openMessages(chats.bid)}>Schedule</span> */}
                </Card>);
            return (<div className="nav-bar-user">
                <Button id="Popover1" type="button">
                    Messages
                </Button>
                <Popover className="popover" placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglePopover.bind(this)}>
                    <PopoverHeader>...</PopoverHeader>
                    <PopoverBody>
                       {ChatsList}
                       {BusinessChatsList}
                    </PopoverBody>
                </Popover> 
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