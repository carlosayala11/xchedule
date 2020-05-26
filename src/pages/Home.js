import React, {Component} from 'react';
//import logo_black_circle from "../logo_black_circle.png";
import '../styles/Home.css'
import Slideshow from "../components/Carousel";
import Calendar from "../components/Calendar"
import NavigationBar from '../components/NavigationBar'
import CreateBusinessForm from '../components/CreateBusinessForm'
import UpddateBusinessForm from '../components/UpdateBusinessForm'
import {Redirect} from 'react-router-dom'
import {Container, Row, Col, Card, CardText, CardTitle, Button, CardBody, Form,
         Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
var axios = require('axios');
var firebase = require('firebase');

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
            total3:'',
            modal: false,
            isOwner: false,
            loggedIn:false,
            labelName:''
        }
        this.toggle = this.toggle.bind(this);

        this.getBusinessList = this.getBusinessList.bind(this)
    }

    componentDidMount(){
        this.getBusinessList();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              this.checkIfIsOwner();
              this.getBusinessList();
              this.setState({loggedIn:true})
            } else {
                console.log("no user")
              // No user is signed in.
            }
          });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
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

    checkIfIsOwner(){
        var id = firebase.auth().currentUser.uid;
        console.log(this.state.id);
        axios.get('http://localhost:5000/users',{
            params: {
                id: id
            }
        })
        .then(res => {
            var user = res.data.User;
            console.log("user",user);
            this.setState({isOwner: user.isOwner})
            if (this.state.isOwner){
                this.state.labelName = 'Update Business';
            }
            else{
                this.state.labelName = 'Create Business';
            }
            console.log('owner',this.state.isOwner)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    renderBusinessForm(){
        if (!this.state.isOwner){
           // console.log(this.state.isOwner);
            return <CreateBusinessForm></CreateBusinessForm>
        }
        else{
            return <UpddateBusinessForm></UpddateBusinessForm>
        }
    }

    // componentDidMount(){
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //           // User is signed in.
    //           this.checkIfIsOwner();
    //           this.getBusinessList();
    //         } else {
    //             console.log("no user")
    //           // No user is signed in.
    //         }
    //       });
    // }

    render(){
        if(!this.state.loggedIn){
            return <Redirect to="/login"/>
        }
        //this.getBusinessList();
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
                                    <p className="card-title">Today's Appointments</p>
                                    <div className="calendar">
                                        <Calendar></Calendar>
                                    </div>
                            </Col>
                            <Col sm="4">
                                <Card>
                                    {/* Manage/Create Business Modal */}
                                    <CardTitle className="card-title">Manage your Business</CardTitle>
                                    <CardBody>
                                        <CardText>
                                            <Button onClick={this.toggle}>{this.state.labelName}</Button>
                                            <Modal modalClassName="business-modal" isOpen={this.state.modal} toggle={this.toggle}>
                                                <ModalHeader toggle={this.toggle}>{this.state.labelName}</ModalHeader>
                                                <ModalBody>
                                                    {this.renderBusinessForm()}
                                                </ModalBody>
                                                <ModalFooter>
                                                    {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </CardText>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardTitle className="card-title">Top Businesses</CardTitle>
                                    <CardBody>
                                        <CardText>{this.state.bname1}: {this.state.total1} appointments</CardText>
                                        <CardText>{this.state.bname2}: {this.state.total2} appointments</CardText>
                                        <CardText>{this.state.bname3}: {this.state.total3} appointments</CardText>
                                        <Form action="http://localhost:3000/business/all">
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