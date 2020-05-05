import React, {Component} from 'react';
import '../styles/Business.css'
import NavigationBar from "../components/NavigationBar";
import BusinessForm from "../components/BusinessForm";

class Business extends Component{
    constructor(){
        super();
        this.state={
        }

    }

    render(){
        return(
            <div className="business-page">
                <NavigationBar></NavigationBar>
                <BusinessForm></BusinessForm>
            </div>

        )
    }
}

export default Business;