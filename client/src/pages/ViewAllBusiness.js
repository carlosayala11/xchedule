import React, {Component} from 'react';
import NavigationBar from "../components/NavigationBar";
import BusinessList from "../components/BusinessList";
import '../styles/Profile.css'


class ViewAllBusiness extends Component{
    constructor(){
        super();
        this.state={
        }

    }

    renderForm(){

        return(
            <BusinessList></BusinessList>
        )

    }



    render(){
            return(
                <div className='searchBusiness-page'>
                    {/* <img src={logo_black} className="logo"/> */}
                    <NavigationBar></NavigationBar>
                    {/* <h1>Create New Appointment</h1> */}
                    {this.renderForm()}
                </div>
            )
        }}

export default ViewAllBusiness;