import React, {Component} from 'react';
import '../styles/UpdateBusiness.css'
import UserForm from '../components/UserForm'
import NavigationBar from '../components/NavigationBar'
import UpdateBusinessForm from '../components/UpdateBusinessForm'


class UpdateBusiness extends Component{
    constructor(){
        super();
        this.state={
        }

    }

    render(){
        return(
            <div className="updateBusiness-page">
                <NavigationBar></NavigationBar>
                <UpdateBusinessForm></UpdateBusinessForm>
            </div>

        )
    }
}

export default UpdateBusiness;