import React, {Component} from 'react';
import '../styles/CreateBusiness.css'
import NavigationBar from "../components/NavigationBar";
import ServiceForm from "../components/ServiceForm";
import {Redirect} from 'react-router-dom'
import * as firebase from 'firebase'


class AddService extends Component{
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
                this.setState({loggedIn:false})

                console.log("no user")
              // No user is signed in.
            }
          });
    }

    renderForm(){

        return(
            <ServiceForm></ServiceForm>
        )

    }



    render(){
        if(!this.state.loggedIn){
            return <Redirect to="/login"/>
        }
            return(
                <div className='createBusiness-page'>
                    {/* <img src={logo_black} className="logo"/> */}
                    <NavigationBar></NavigationBar>
                    {/* <h1>Create New Appointment</h1> */}
                    {this.renderForm()}
                </div>
            )
        }}

export default AddService;