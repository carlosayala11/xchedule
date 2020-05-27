import React, {Component} from 'react';
//import NavigationBar from "../components/NavigationBar";
//import BusinessList from "../components/BusinessList";
import '../styles/Business.css'
//import {Link} from 'react-router-dom'
//import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import * as firebase from 'firebase'




class ViewBusiness extends Component{
    constructor(){
        super();
        this.state={
          bid:'',
          businessData:'',
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
      this.setState({
        bid: sessionStorage.getItem('bid')
        }, () => {
        axios.get('https://xchedule-api.herokuapp.com/business', {
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
      if(!this.state.loggedIn){
        return <Redirect to="/login"/>
      }

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