import React, {Component} from 'react';
import '../styles/CreateBusiness.css'
import NavigationBar from "../components/NavigationBar";
import ServiceForm from "../components/ServiceForm";


class AddService extends Component{
    constructor(){
        super();
        this.state={
        }

    }

    renderForm(){

        return(
            <ServiceForm></ServiceForm>
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

export default AddService;