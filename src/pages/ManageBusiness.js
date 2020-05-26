import React, {Component} from 'react';
import '../styles/Business.css'
import BusinessCalendar from "../components/BusinessCalendar"
import NavigationBar from '../components/NavigationBar'
import {Container, Row, Col, Card, CardTitle, Button, CardBody, Form} from 'reactstrap'
import {
    Link, Redirect
} from "react-router-dom";
import * as firebase from 'firebase'
var axios = require('axios');


class ManageBusiness extends Component{
    constructor(){
        super();
        this.state={
            businessData:'',
            businessSelected:false,
            businessDeleted:false,
            servicesSelected:false,
            loggedIn:false
        }
    this.passBusinessId = this.passBusinessId.bind(this)
    this.servicesFromBusiness = this.servicesFromBusiness.bind(this)
    this.deleteBusiness = this.deleteBusiness.bind(this)
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn:true})
                // console.log(user)
                  axios.get('http://localhost:5000/business',{
                    params: {
                        id: user.uid
                            }
                }).then((res)=>{
                    this.setState({businessData: res.data.Business})
                }).catch((err)=>{
                    console.log(err)
                })

              // User is signed in.
            } else {
                console.log("no user")
              // No user is signed in.
            }
          });
    }
    deleteBusiness(bid){
        console.log(bid)
        axios.delete('http://localhost:5000/business/delete',{
                    params: {
                        id: bid
                            }
                }).then((res)=>{
                    this.setState({businessDeleted: true})
                }).catch((err)=>{
                    console.log(err)
                });
    }

    passBusinessId(bid){
        console.log(bid)
        sessionStorage.setItem('bid', bid)
        this.setState({businessSelected:true})
    }

    servicesFromBusiness(bid){
        console.log(bid)
        sessionStorage.setItem('bid', bid)
        this.setState({servicesSelected:true})
    }
    render(){

        if(!this.state.loggedIn){
            return <Redirect to="/login"/>
        }

        if(this.state.businessSelected){
            return(
                <Redirect to="/service/create"/>
            )
        }
        if(this.state.businessDeleted){
            return(
                <Redirect to="/home"/>
            )
        }

        if(this.state.servicesSelected){
            return(
                <Redirect to="/business/services"/>
            )
        }
        return(
            <div className="business-page">
                <NavigationBar/>
                <div className="business-body-container">
                    <Container>
                        <Row>
                            <Col>
                                <Card className="business-card">
                                    <img className="business-img" src="https://via.placeholder.com/150x150"></img>
                                    <CardTitle className="business-name">{this.state.businessData.bname}</CardTitle>
                                    <CardBody>
                                        <div className="card-segment">
                                            <p className="card-segment-title">Open Hours</p>
                                            <p className="working-hours">{this.state.businessData.sworkingHours} - {this.state.businessData.eworkingHours}</p>
                                            <p className="time-restriction">Time Restriction: {this.state.businessData.timeRestriction} mins</p>
                                        </div>
                                        <div className="card-segment">
                                            <p className="card-segment-title">Basic Information</p>
                                            <p className="business-location">{this.state.businessData.city}, {this.state.businessData.country} {this.state.businessData.zip}</p>
                                        </div>
                                        <div className="card-segment">
                                            <p className="card-segment-title">Social Media</p>
                                            <p className="social-media-text">Website: {this.state.businessData.website_url}</p>
                                            <p className="social-media-text">Twitter: {this.state.businessData.twitter}</p>
                                            <p className="social-media-text">Instagram:{this.state.businessData.instagram}</p>
                                            <p className="social-media-text">Facebook: {this.state.businessData.facebook}</p>
                                        </div>
                                        <Button className="update-business-button">
                                            <Link to="/business/appointments">View Appointments</Link>
                                        </Button>
                                        <Button className="update-business-button" onClick={() => this.passBusinessId(this.state.businessData.bid)}>Add Service</Button>
                                        <Button className="update-business-button" onClick={() => this.servicesFromBusiness(this.state.businessData.bid)}>View Services From Business</Button>
                                        <Button className="update-business-button" onClick={() => this.deleteBusiness(this.state.businessData.bid)}>Delete Business</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <div className="calendar">
                                    <p className="appointments-title">Appointments</p>
                                    <BusinessCalendar></BusinessCalendar>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default ManageBusiness;