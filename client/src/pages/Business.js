import React, {Component} from 'react';
import '../styles/Business.css'
import NavigationBar from "../components/NavigationBar";
import CreateBusinessForm from "../components/CreateBusinessForm";


class Business extends Component{
    constructor(){
        super();
        this.state={
        }

    }

    renderForm(){

        return(
            <CreateBusinessForm></CreateBusinessForm>
        )

    }



    render(){
            return(
                <div className='createBusiness-page'>
                    {/* <img src={logo_black} className="logo"/> */}
                    <NavigationBar></NavigationBar>
                    {/* <h1>Create New Appointment</h1> */}
                    {this.renderForm()}
                </div>
            )
        }}

export default Business;