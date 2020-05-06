import {Button, Col, Container, Input, Row, Spinner} from "reactstrap";
import React, {Component} from 'react';
import "flatpickr/dist/themes/dark.css";
import '../styles/CreateBusiness.css'
import {Redirect} from "react-router-dom";
import axios from 'axios'
import * as firebase from 'firebase';



class CreateBusinessForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            twitter: '',
            facebook: '',
            instagram: '',
            website: '',
            sworkingHours: '',
            eworkingHours: '',
            workingDays: '',
            address: '',
            country: '',
            city: '',
            zip: '',
            timeRestriction: '',
            loadingBusinessCreation:false,
            businessCreated:false
        };
    }
    onInputChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

   createBusinessAccount(){
        this.setState({loadingBusinessCreation:true})
        var business = {
                    uid: firebase.auth().currentUser.uid,
                    bname: this.state.name,
                    twitter: this.state.twitter,
                    facebook: this.state.facebook,
                    instagram: this.state.instagram,
                    website_url: this.state.website,
                    sworkingHours: this.state.sworkingHours,
                    eworkingHours: this.state.eworkingHours,
                    workingDays: this.state.workingDays,
                    baddress: this.state.address,
                    country: this.state.country,
                    city: this.state.city,
                    zip: this.state.zip,
                    timeRestriction: this.state.timeRestriction
                }
        console.log(business)
        axios.post('https://xchedule-api.herokuapp.com/business', business
        ).then((res)=>{this.setState({businessCreated:true})
            console.log(res)
        }).catch(function (error) {
                console.log(error);
        });


    }

    renderCreateBusinessSpinner(){
        if(this.state.loadingBusinessCreation){
            return <Spinner color="primary" />
        }else{
            return <p className="button-text">Create Business</p>
        }
    }


    render(){
        if(this.state.businessCreated){
            return <Redirect to='/profile'/>;

        }
        return(
            <div className="signUp-form">
                <p className="login-title">Create an Business</p>
                <Container>
                    <Row>
                        <Col>
                            <Input className="login-input" name="name" placeholder="Name" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                            <Input className="login-input" name="twitter" placeholder="Twitter" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input className="login-input" name="facebook" placeholder="Facebook" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                            <Input className="login-input" name="instagram" placeholder="Instagram" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input className="login-input" name="website" placeholder="Webiste" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                        <Input className="login-input" name="sworkingHours" placeholder="Working Hours Start Time" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input className="login-input" name="eworkingHours" placeholder="Working Hours End Time" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                        <Input className="login-input" name="workingDays" placeholder="Working Days" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input className="login-input" name="address" placeholder="Address" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                        <Input className="login-input" name="country" placeholder="Country" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input className="login-input" name="city" placeholder="City" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                        <Input className="login-input" name="zip" placeholder="Zip Code" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Input className="login-input" name="timeRestriction" placeholder="Time Restriction" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                </Container>

                <Button className="login-button" color="primary" onClick={this.createBusinessAccount.bind(this)}>
                    {this.renderCreateBusinessSpinner()}
                </Button>

            </div>


        )
    }
}

export default CreateBusinessForm;