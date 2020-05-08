import React, {Component} from 'react';
import logo_black_circle from "../logo_black_circle.png";
import '../styles/Home.css'
import Slideshow from "../components/Carousel";
import Calendar from "../components/Calendar"
import NavigationBar from '../components/NavigationBar'
import {Container, Row, Col, Card, CardText, CardTitle, Button, CardBody, Form} from 'reactstrap'
var axios = require('axios');

class Home extends Component{
    constructor(){
        super();
        this.state={
            bid1:'',
            bid2:'',
            bid3:'',
            bname1:'',
            bname2:'',
            bname3:'',
            total1:'',
            total2:'',
            total3:''
        }

    }
     getBusinessList() {
        axios.get('http://localhost:5000/business/top')
        .then(res => {
            var bus = res.data.TopBusinessList;
            console.log("top business list",bus);
            this.setState({bid1:bus[0].bid})
            this.setState({bname1: bus[0].bname})
            this.setState({total1: bus[0].total_appointments})
            this.setState({bid2:bus[1].bid})
            this.setState({bname2: bus[1].bname})
            this.setState({total2: bus[1].total_appointments})
            this.setState({bid3:bus[2].bid})
            this.setState({bname3: bus[2].bname})
            this.setState({total3: bus[2].total_appointments})
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render(){
        this.getBusinessList();
        return(
            <div className="home-page">
                <NavigationBar/>
                {/* <div className="lheader">
                    <img src={logo_black_circle} className="home-logo"/>
                </div> */}
                {/* <div className="rheader">
                    <br/><br/><br/><h1 className="h1">Xchedule</h1>
                    <h2 className="h2">Organize your appointments effectively.</h2><br/>
                </div> */}
                <div className="home-body-container">
                    <div className="carousel">
                        <Slideshow></Slideshow>
                    </div>
                    <Container className="home-bottom-container">
                        <Row>
                            <Col sm="8">
                                <Card>
                                    <p className="card-title">Today's Appointments</p>
                                    <div className="calendar">
                                        <Calendar></Calendar>
                                    </div>
                                </Card>
                                
                            </Col>
                            <Col sm="4">
                            <Card>
                                <CardTitle className="card-title">Top Businesses</CardTitle>
                                <CardBody>
                                    <CardText>{this.state.bname1}: {this.state.total1} appointments</CardText>
                                    <CardText>{this.state.bname2}: {this.state.total2} appointments</CardText>
                                    <CardText>{this.state.bname3}: {this.state.total3} appointments</CardText>
                                    <Form action="http://localhost:3000/profile">
                                    <Button className="all-business" >View More</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                    </Container>
                    
                </div>
                

            </div>
        )
    }
}

export default Home;