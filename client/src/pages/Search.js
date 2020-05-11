import React, {Component} from 'react';
import NavigationBar from "../components/NavigationBar";
import SearchBusiness from "../components/SearchBusiness";
import '../styles/Search.css'


class Search extends Component{
    constructor(){
        super();
        this.state={
        }

    }

    renderForm(){

        return(
            <SearchBusiness></SearchBusiness>
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

export default Search;