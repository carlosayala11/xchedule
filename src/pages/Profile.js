import React, {Component} from 'react';
import '../styles/Profile.css'
import UserForm from '../components/UserForm'
import NavigationBar from '../components/NavigationBar'
import {Redirect} from 'react-router-dom'
import * as firebase from 'firebase'

//import {Button, Input} from 'reactstrap';
//import {NavLink} from "react-router-dom";
//import logo_black_circle from "../logo_black_circle.png";


class Profile extends Component{
    constructor(){
        super();
        this.state={
            loggedIn:false
        }
        
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              
              this.setState({loggedIn:true})
            } else {
                console.log("no user")
              // No user is signed in.
            }
          });
    }
    render(){
        if(!this.state.loggedIn){
            return <Redirect to="/login"/>
        }
        return(
            <div className="profile-page">
                <NavigationBar></NavigationBar>
                <UserForm></UserForm>
            </div>






            // <div className="profile-page">
            //     <NavigationBar></NavigationBar>
            //     <div className="jumbotron-div">
            //         <div className="jumbotron-segment">
            //             <h1 className="jumbotron-title"><strong>Personal Profile</strong></h1>
            //             <p className="jumbotron-text">Manage your profile information from here.</p>
            //             <form className="form">
            //                 <label htmlFor="fname"> [firstname]  </label> <input type="text" id="fname" name="fname"></input> <br/>
            //                 <label htmlFor="mname"> [middlename]  </label> <input type="text" id="mname" name="mname"></input> <br/>
            //                 <label htmlFor="lname"> [lastname]  </label> <input type="text" id="lname" name="lname"></input> <br/>
            //                 <div className="dropdown">
            //                     <label htmlFor="gender"> [gender]  </label> <button className="dropbtn">Select Gender</button>
            //                     <div className="dropdown-content">
            //                         <a href="#">Male</a>
            //                         <a href="#">Female</a>
            //                         <a href="#">Other</a>
            //                     </div>
            //                 </div>
            //                 <br/> <label htmlFor="bdate"> [birthdate] </label> <input type="date" className="bd" name="bdate"></input> <br/>
            //                 <label htmlFor="email"> [email]  </label> <input type="text" id="email" name="email"></input> <br/>
            //                 <label htmlFor="phone"> [phone]  </label> <input type="text" id="phone" name="phone"></input> <br/>
            //                 <br/> <Button>Click here to submit the changes made.</Button>
            //             </form>
            //             <br/><br/><NavLink to="/business"> <Button>Want to manage your own business? Click here!</Button> </NavLink>
            //         </div>
            //     </div>
            //     <img src={logo_black_circle} className="profile-logo"/>
            // </div>
        )
    }
}

export default Profile;