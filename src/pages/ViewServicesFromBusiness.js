
import React, {Component} from 'react';
import NavigationBar from "../components/NavigationBar";
import '../styles/AllServices.css'
import {Button, Card, CardTitle} from 'reactstrap';
import axios from 'axios'
import {Redirect} from "react-router-dom";
import * as firebase from 'firebase'




class ViewServicesFromBusiness extends Component{
    constructor(){
        super();
        this.state={
            results: [],
            data: '',
            businessSelected:false,
            loggedIn:false
        }
        this.deleteService = this.deleteService.bind(this)
    }

    componentDidMount(){
        this.getServicesByBusinessID();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              
              this.setState({loggedIn:true})
            } else {
                console.log("no user")
              // No user is signed in.
            }
          });
      }

    getServicesByBusinessID = () => {
        var id = sessionStorage.getItem('bid');
        console.log(id);
        axios.get(`http://localhost:5000/business/services/all`, {
            params: {
                id: id
            }
        })
          .then(res => {
            console.log(res.data)
            this.setState({
              data: res.data.ServicesByBusinessId
            })
          })
          sessionStorage.clear();
      }
    deleteService(sid){
        console.log(sid)
        axios.delete('http://localhost:5000/services/delete',{
                    params: {
                        id: sid
                            }
                }).then((res)=>{
                    this.setState({businessSelected:true})
                }).catch((err)=>{
                    console.log(err)
                });

    }

    render(){
        if(!this.state.loggedIn){
            return <Redirect to="/login"/>
          }
        if(this.state.businessSelected){
            return(
                <Redirect to="/home"/>
            )
        }
        const services = Array.from(this.state.data);
        const listItems = services.map((service) =>
            <Card key={service.sid}>
                <CardTitle>Service Type:</CardTitle>
                <p className="type">{service.servicetype}</p>
                <p className="details">Service Details:</p>
                <p className="info">{service.servicedetails}</p>
                <Button onClick={() => this.deleteService(service.sid)}>Delete</Button>
            </Card>
        );

        return(
            <div className='all-services-page'>
                <NavigationBar></NavigationBar>
                <div className="cards-container">
                    {listItems}
                </div>
            </div>
        )
    }

}


export default ViewServicesFromBusiness;