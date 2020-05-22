import React, {Component} from 'react';
import NavigationBar from "../components/NavigationBar";
import BusinessList from "../components/BusinessList";
import '../styles/AllBusiness.css'
import {Link} from 'react-router-dom'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import axios from 'axios'




class ViewAllBusiness extends Component{
    constructor(){
        super();
        this.state={
        }

    }

    componentDidMount(){
    }
      
    render() {
        // const { data } = this.props.location.state
        return (
          // render logic here
          <div>
            <NavigationBar></NavigationBar>
          </div>
          
        )
      }

}
    

export default ViewAllBusiness;