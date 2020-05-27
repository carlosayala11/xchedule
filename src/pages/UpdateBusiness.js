import React, {Component} from 'react';
import '../styles/UpdateBusiness.css'
//import UserForm from '../components/UserForm'
import NavigationBar from '../components/NavigationBar'
import UpdateBusinessForm from '../components/UpdateBusinessForm'
import {Redirect} from 'react-router-dom'
import * as firebase from 'firebase'

class UpdateBusiness extends Component{
    constructor(){
        super();
        this.state={
            loggedIn:true
        }

    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              
            } else {
                console.log("no user")
                this.setState({loggedIn:false})

              // No user is signed in.
            }
          });
    }

    render(){
        if(!this.state.loggedIn){
            return <Redirect to="/login"/>
        }
        return(
            <div className="updateBusiness-page">
                <NavigationBar></NavigationBar>
                <UpdateBusinessForm></UpdateBusinessForm>
            </div>

        )
    }
}

export default UpdateBusiness;