import React, {Component} from 'react';
//import NavigationBar from "../components/NavigationBar";
//import BusinessList from "../components/BusinessList";
import '../styles/Business.css'
//import {Link} from 'react-router-dom'
//import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import axios from 'axios'




class ViewBusiness extends Component{
    constructor(){
        super();
        this.state={
          bid:'',
          businessData:''
        }

    }

    componentDidMount(){
      this.setState({
        bid: sessionStorage.getItem('bid')
        }, () => {
        axios.get('http://localhost:5000/business', {
            params: {
              id: this.state.bid
            }
          })
          .then((response) =>{
            this.setState({businessData:response.data.Business},()=>{
              console.log(this.state.businessData.bname)
            })
          })
          .catch(function (error) {
            console.log(error);
          });
      });

    }

    render() {


        // const { data } = this.props.location.state
        return (
          // render logic here
          <div>
            {/* <NavigationBar></NavigationBar> */}

          </div>

        )
      }

}


export default ViewBusiness;