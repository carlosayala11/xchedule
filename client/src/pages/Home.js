import React, {Component} from 'react';
import logo_black_circle from "../logo_black_circle.png";
import '../styles/Home.css'
import Slideshow from "../components/Carousel";
import Calendar from "../components/Calendar"
import NavigationBar from '../components/NavigationBar'
import {Container, Row, Col, Card, CardText, CardTitle, Button, CardBody} from 'reactstrap'

class Home extends Component{
    constructor(){
        super();
        this.state={
        }

    }

    render(){
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
                                    <CardText>Business 1</CardText>
                                    <CardText>Business 2</CardText>
                                    <CardText>Business 3</CardText>

                                    <Button className="all-business">View More</Button>
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